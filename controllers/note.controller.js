import User from "../models/user.model.js";

import { validateNotesArray } from "../schemas/user.schema.js";

export async function getNotes(req, res) {
  const { id, noteId } = req.params;

  if (id.length !== 24)
    return res.status(400).json({ message: "Id not valid" });

  if (noteId && noteId.length !== 24) {
    return res.status(400).json({ message: "Note id not valid" });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!noteId) {
      return res.json({ notes: [...user.notes] });
    }

    const note = user.notes.find((e) => e._id !== id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.json({ note: note });
  } catch (_) {
    return res
      .status(500)
      .json({ message: "An error ocurred while finding notes" });
  }
}

export async function postNotes(req, res) {
  const { id } = req.params;

  if (id.length !== 24) {
    return res.status(400).json({ message: "Id not valid" });
  }

  const { notes } = req.body;

  const result = validateNotesArray(notes);

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userUpdated = await User.findOneAndUpdate(
      { _id: id },
      { notes: [...user.notes, ...result.data] },
      { new: true }
    );

    return res.json({ message: "Notes added", user: userUpdated });
  } catch (_) {
    return res
      .status(500)
      .json({ message: "An error ocurred while adding notes" });
  }
}

export async function putNotes(req, res) {
  const { id, noteId } = req.params;

  if (id.length !== 24 || noteId.length !== 24) {
    return res.status(400).json({ message: "Id not valid" });
  }

  try {
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const noteIndex = user.notes.findIndex((note) => note.id === noteId);

    if (noteIndex === -1)
      return res.status(404).json({ message: "Note not found" });

    const {
      note: { title, content, color },
    } = req.body;

    const newNotes = user.notes;

    newNotes[noteIndex].title = title;
    newNotes[noteIndex].content = content;
    newNotes[noteIndex].color = color;

    const userUpdated = await User.findOneAndUpdate(
      { _id: id },
      { notes: newNotes },
      { new: true }
    );

    return res.json({ user: userUpdated });
  } catch (_) {
    return res
      .status(500)
      .json({ message: "An error ocurred while updating the note" });
  }
}
