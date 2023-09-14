const express = require("express");
const opportunityTypeRoutes = express.Router();
const {
  createOpportunityType,
  getAllOpportunityType,
  getSingleOpportunityType,
  updateOpportunityType,
  deleteOpportunityType,
} = require("./opportunityType.controller");
const authorize = require("../../../utils/authorize");
opportunityTypeRoutes.post(
  "/",
  authorize("create-opportunityType"),
  createOpportunityType
);
opportunityTypeRoutes.get(
  "/",
  authorize("readAll-opportunityType"),
  getAllOpportunityType
);
opportunityTypeRoutes.get(
  "/:id",
  authorize("readSingle-opportunityType"),
  getSingleOpportunityType
);
opportunityTypeRoutes.put(
  "/:id",
  authorize("update-opportunityType"),
  updateOpportunityType
);
opportunityTypeRoutes.delete(
  "/:id",
  authorize("delete-opportunityType"),
  deleteOpportunityType
);

module.exports = opportunityTypeRoutes;
