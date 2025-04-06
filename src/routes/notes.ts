import express from "express";
import { db } from "../database";
import { notes } from "../db/schema";
import { eq } from "drizzle-orm";

const router = express.Router();

// Get all notes
router.get("/", async (req, res) => {
  const result = await db.select().from(notes);
  res.json(result);
});

// Add note
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  await db.insert(notes).values({ title, content });
  res.json({ message: "Note created", data: { title, content } });
});

// Update note
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  await db
    .update(notes)
    .set({ title, content })
    .where(eq(notes.id, Number(id)));
  res.json({ message: "Note updated", data: { id, title, content } });
});

// Delete note
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.delete(notes).where(eq(notes.id, Number(id)));
  res.json({ message: "Note deleted" });
});

export default router;
