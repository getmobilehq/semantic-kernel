const express = require("express");
const contactStageRoutes = express.Router();
const {
  createContactStage,
  getAllContactStage,
  getSingleContactStage,
  updateContactStage,
  deleteContactStage,
} = require("./contactStage.controller");
const authorize = require("../../../utils/authorize");
contactStageRoutes.post(
  "/",
  authorize("create-contactStage"),
  createContactStage
);
contactStageRoutes.get(
  "/",
  authorize("readAll-contactStage"),
  getAllContactStage
);
contactStageRoutes.get(
  "/:id",
  authorize("readSingle-contactStage"),
  getSingleContactStage
);
contactStageRoutes.put(
  "/:id",
  authorize("update-contactStage"),
  updateContactStage
);
contactStageRoutes.delete(
  "/:id",
  authorize("delete-contactStage"),
  deleteContactStage
);

module.exports = contactStageRoutes;
