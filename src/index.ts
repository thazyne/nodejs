import express from "express";
import notesRouter from "./routes/notes";

const app = express();
app.use(express.json());

app.use("/notes", notesRouter);

app.listen(3000, () => console.log("Server ready on http://localhost:3000"));
