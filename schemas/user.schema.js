import { z } from "zod";

const noteSchema = z.object({
  title: z.string().trim(),
  content: z.string(),
  color: z.string().optional(),
});

const userSchema = z.object({
  user: z.string().trim(),
  email: z.string().email().trim(),
  password: z.string().trim(),
  notes: z.array(noteSchema),
});

const notesArraySchema = z.array(noteSchema);

export function validateUser(user) {
  return userSchema.safeParse(user);
}

export function validatePartialUser(user) {
  return userSchema.partial().safeParse(user);
}

export function validateNote(note) {
  return noteSchema.safeParse(note);
}

export function validatePartialNote(note) {
  return noteSchema.partial().safeParse(note);
}

export function validateNotesArray(notes) {
  return notesArraySchema.safeParse(notes);
}
