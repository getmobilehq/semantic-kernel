const express = require("express");
const contactRoutes = express.Router();
const {
  createContact,
  getAllContact,
  getSingleContact,
  updateContact,
  deleteContact,
} = require("./contact.controller");
const authorize = require("../../../utils/authorize"); // authentication middleware

contactRoutes.post("/", authorize("create-contact"), createContact);
contactRoutes.get("/", authorize("readAll-contact"), getAllContact);
contactRoutes.get("/:id", authorize("readSingle-contact"), getSingleContact);
contactRoutes.put("/:id", authorize("update-contact"), updateContact);
contactRoutes.patch("/:id", authorize("delete-contact"), deleteContact);

module.exports = contactRoutes;
