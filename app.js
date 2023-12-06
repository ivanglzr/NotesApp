import express from "express";

import {
  getUser,
  postUser,
  putUser,
  deleteUser,
} from "./controllers/user.controller.js";

import {
  deleteNote,
  getNote,
  postNote,
  putNote,
} from "./controllers/note.controller.js";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.get("/user/:id?", getUser);
app.post("/user", postUser);
app.put("/user/:id", putUser);
app.delete("/user/:id", deleteUser);

app.get("/user/:id/note/:noteId?", getNote);
app.post("/user/:id/note/", postNote);
app.put("/user/:id/note/:noteId", putNote);
app.delete("/user/:id/note/:noteId", deleteNote);

export default app;
