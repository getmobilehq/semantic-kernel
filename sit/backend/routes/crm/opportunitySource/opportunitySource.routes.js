const express = require("express");
const opportunitySourceRoutes = express.Router();
const {
  createOpportunitySource,
  getAllOpportunitySource,
  getSingleOpportunitySource,
  updateOpportunitySource,
  deleteOpportunitySource,
} = require("./opportunitySource.controller");
const authorize = require("../../../utils/authorize");
opportunitySourceRoutes.post(
  "/",
  authorize("create-opportunitySource"),
  createOpportunitySource
);
opportunitySourceRoutes.get(
  "/",
  authorize("readAll-opportunitySource"),
  getAllOpportunitySource
);
opportunitySourceRoutes.get(
  "/:id",
  authorize("readSingle-opportunitySource"),
  getSingleOpportunitySource
);
opportunitySourceRoutes.put(
  "/:id",
  authorize("update-opportunitySource"),
  updateOpportunitySource
);
opportunitySourceRoutes.delete(
  "/:id",
  authorize("delete-opportunitySource"),
  deleteOpportunitySource
);

module.exports = opportunitySourceRoutes;
