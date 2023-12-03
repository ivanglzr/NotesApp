import express from "express";

import {
  getUser,
  postUser,
  putUser,
  deleteUser,
} from "./controllers/user.controller.js";

import {
  getNotes,
  postNotes,
  putNotes,
} from "./controllers/note.controller.js";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.get("/user/:id?", getUser);
app.post("/user", postUser);
app.put("/user/:id", putUser);
app.delete("/user/:id", deleteUser);

app.get("/user/:id/note/:noteId?", getNotes);
app.post("/user/:id/note/", postNotes);
app.put("/user/:id/note/:noteId", putNotes);

export default app;
