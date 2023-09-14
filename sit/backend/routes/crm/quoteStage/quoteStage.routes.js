const express = require("express");
const quoteStageRoutes = express.Router();
const {
  createQuoteStage,
  getAllQuoteStages,
  getSingleQuoteStage,
  updateQuoteStage,
  deleteQuoteStage,
} = require("./quoteStage.controller");
const authorize = require("../../../utils/authorize");
quoteStageRoutes.post("/", authorize("create-quoteStage"), createQuoteStage);
quoteStageRoutes.get("/", authorize("readAll-quoteStage"), getAllQuoteStages);
quoteStageRoutes.get(
  "/:id",
  authorize("readSingle-quoteStage"),
  getSingleQuoteStage
);
quoteStageRoutes.put("/:id", authorize("update-quoteStage"), updateQuoteStage);
quoteStageRoutes.delete(
  "/:id",
  authorize("delete-quoteStage"),
  deleteQuoteStage
);

module.exports = quoteStageRoutes;
