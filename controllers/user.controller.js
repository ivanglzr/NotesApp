import { validateUser } from "../schemas/user.schema.js";

import User from "../models/user.model.js";

export async function getUser(req, res) {
  const { id } = req.params;

  if (!id) {
    try {
      const users = await User.find({});

      return res.json({ status: "success", users });
    } catch (_) {
      return res.status(500).json({
        status: "error",
        message: "An error happened while finding the users",
      });
    }
  }

  if (id.length !== 24) {
    return res.status(400).json({ status: "error", message: "Id not valid" });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    return res.json({ user });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An error happened while finding the user",
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.params;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(404).json({ status: "error", message: "Login dennied" });
  }

  return res.json({ status: "success", user, message: "Logged with exit" });
}

export async function postUser(req, res) {
  const result = validateUser(req.body.user);

  if (result.error) {
    return res
      .status(422)
      .json({ status: "error", message: JSON.parse(result.error.message) });
  }

  try {
    const user = new User({ ...result.data });

    const newUser = await user.save();

    res.setHeader("Content-Type", "application/json");

    return res
      .status(201)
      .json({ status: "success", message: "User created", user: newUser });
  } catch (_) {
    return res.status(500).json({
      status: "error",
      message: "An error happened while saving the user",
    });
  }
}

export async function putUser(req, res) {
  const result = validateUser(req.body.user);

  if (result.error) {
    return res
      .status(422)
      .json({ status: "error", message: JSON.parse(result.error.message) });
  }

  const { id } = req.params;

  if (id.length !== 24) {
    return res.status(400).json({ status: "error", message: "Id not valid" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { ...result.data },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    return res.json({ status: "success", message: "User updated", user });
  } catch (_) {
    return res.status(500).json({
      status: "error",
      message: "An error happened while updating the user",
    });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;

  if (id.length !== 24) {
    return res.status(400).json({ status: "error", message: "Id not valid" });
  }

  const { password } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    if (password !== user.password) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid password" });
    }
  } catch (_) {
    return res.status(500).json({
      status: "error",
      message: "An error happened while deleting the user",
    });
  }

  try {
    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ status: "success", message: "User deleted" });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An error happened while deleting the user",
    });
  }
}
