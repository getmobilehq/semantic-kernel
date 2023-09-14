const express = require("express");
const opportunityStageRoutes = express.Router();
const {
  createOpportunityStage,
  getAllOpportunityStage,
  getSingleOpportunityStage,
  updateOpportunityStage,
  deleteOpportunityStage,
} = require("./opportunityStage.controller");
const authorize = require("../../../utils/authorize");
opportunityStageRoutes.post(
  "/",
  authorize("create-opportunityStage"),
  createOpportunityStage
);
opportunityStageRoutes.get(
  "/",
  authorize("readAll-opportunityStage"),
  getAllOpportunityStage
);
opportunityStageRoutes.get(
  "/:id",
  authorize("readSingle-opportunityStage"),
  getSingleOpportunityStage
);
opportunityStageRoutes.put(
  "/:id",
  authorize("update-opportunityStage"),
  updateOpportunityStage
);
opportunityStageRoutes.delete(
  "/:id",
  authorize("delete-opportunityStage"),
  deleteOpportunityStage
);

module.exports = opportunityStageRoutes;
