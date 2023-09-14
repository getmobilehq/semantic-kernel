const express = require("express");
const noteRoutes = express.Router();
const authorize = require("../../../utils/authorize");
const {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
} = require("./note.controller");

noteRoutes.post("/", authorize("create-note"), createNote);
noteRoutes.get("/", authorize("readAll-note"), getAllNotes);
noteRoutes.get("/:id", authorize("readSingle-note"), getSingleNote);
noteRoutes.put("/:id", authorize("update-note"), updateNote);
noteRoutes.delete("/:id", authorize("delete-note"), deleteNote);

module.exports = noteRoutes;
