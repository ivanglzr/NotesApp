import User from "../models/user.model.js";

import { validateNote, validateNotesArray } from "../schemas/user.schema.js";

export async function getNote(req, res) {
  const { id, noteId } = req.params;

  if (id.length !== 24)
    return res.status(400).json({ status: "error", message: "Id not valid" });

  if (noteId && noteId.length !== 24) {
    return res
      .status(400)
      .json({ status: "error", message: "Note id not valid" });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "User not found" });
    }

    if (!noteId) {
      return res.json({ status: "success", notes: [...user.notes] });
    }

    const note = user.notes.find((e) => e._id !== id);

    if (!note) {
      return res
        .status(404)
        .json({ status: "error", message: "Note not found" });
    }

    return res.json({ status: "success", note: note });
  } catch (_) {
    return res.status(500).json({
      status: "error",
      message: "An error ocurred while finding notes",
    });
  }
}

export async function postNote(req, res) {
  const { id } = req.params;

  if (id.length !== 24) {
    return res.status(400).json({ status: "error", message: "Id not valid" });
  }

  const { notes } = req.body;

  const result = validateNotesArray(notes);

  if (result.error) {
    return res
      .status(422)
      .json({ status: "error", message: JSON.parse(result.error.message) });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const userUpdated = await User.findOneAndUpdate(
      { _id: id },
      { notes: [...user.notes, ...result.data] },
      { new: true }
    );

    return res.json({ status: "success", message: "Notes added" });
  } catch (_) {
    return res.status(500).json({
      status: "error",
      message: "An error ocurred while adding notes",
    });
  }
}

export async function putNote(req, res) {
  const { id, noteId } = req.params;

  if (id.length !== 24 || noteId.length !== 24) {
    return res.status(400).json({ status: "error", message: "Id not valid" });
  }

  try {
    const user = await User.findById(id);

    if (!user)
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });

    const noteIndex = user.notes.findIndex((note) => note.id === noteId);

    if (noteIndex === -1)
      return res
        .status(404)
        .json({ status: "error", message: "Note not found" });

    const result = validateNote(req.body.note);

    if (result.error) {
      return res
        .status(422)
        .json({ status: "error", message: JSON.parse(result.error.message) });
    }

    const { title, content, color } = result.data;

    if (title === undefined || content === undefined || color === undefined) {
      return res
        .status(400)
        .json({ status: "error", message: "You must send all data" });
    }

    const newNotes = user.notes;

    newNotes[noteIndex].title = title;
    newNotes[noteIndex].content = content;
    newNotes[noteIndex].color = color;

    const userUpdated = await User.findOneAndUpdate(
      { _id: id },
      { notes: newNotes },
      { new: true }
    );

    return res.json({ status: "success", message: "Note updated" });
  } catch (_) {
    return res
      .status(500)
      .json({
        status: "error",
        message: "An error ocurred while updating the note",
      });
  }
}

export async function deleteNote(req, res) {
  const { id, noteId } = req.params;

  if (id.length !== 24 || noteId.length !== 24)
    return res.status(400).json({ status: "error", message: "Id not valid" });

  try {
    const user = await User.findById(id);

    if (!user)
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });

    const noteIndex = user.notes.findIndex((note) => note.id === noteId);

    if (noteIndex === -1)
      return res
        .status(404)
        .json({ status: "error", message: "Note not found" });

    const newNotes = user.notes;

    newNotes.splice(noteIndex, 1);

    const userUpdated = await User.findOneAndUpdate(
      { _id: id },
      { notes: newNotes },
      { new: true }
    );

    return res.json({ status: "success", message: "Note deleted" });
  } catch (_) {
    return res
      .status(500)
      .json({
        status: "error",
        message: "An error ocurred while deleting the note",
      });
  }
}
