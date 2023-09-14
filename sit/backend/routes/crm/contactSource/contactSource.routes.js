const express = require("express");
const contactSourceRoutes = express.Router();
const {
  createContactSource,
  getAllContactSource,
  getSingleContactSource,
  updateContactSource,
  deleteContactSource,
} = require("./contactSource.controller");
const authorize = require("../../../utils/authorize");

contactSourceRoutes.post(
  "/",
  authorize("create-contactSource"),
  createContactSource
);
contactSourceRoutes.get(
  "/",
  authorize("readAll-contactSource"),
  getAllContactSource
);
contactSourceRoutes.get(
  "/:id",
  authorize("readSingle-contactSource"),
  getSingleContactSource
);
contactSourceRoutes.put(
  "/:id",
  authorize("update-contactSource"),
  updateContactSource
);
contactSourceRoutes.delete(
  "/:id",
  authorize("delete-contactSource"),
  deleteContactSource
);

module.exports = contactSourceRoutes;
