import express from "express";

import {
  getUser,
  postUser,
  putUser,
  patchNote,
  deleteUser,
  getNotes,
  postNotes,
} from "./controllers/user.controller.js";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.get("/user/:id?", getUser);

app.post("/user", postUser);

app.put("/user/:id", putUser);

app.patch("/user/:id", patchNote);

app.delete("/user/:id", deleteUser);

app.get("/user/:id/note/:noteId?", getNotes);

app.post("/user/:id/note/", postNotes);

export default app;
