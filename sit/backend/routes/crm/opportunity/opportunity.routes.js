const express = require("express");
const opportunityRoutes = express.Router();
const authorize = require("../../../utils/authorize");
const {
  createOpportunity,
  getAllOpportunity,
  getSingleOpportunity,
  updateOpportunity,
  deleteOpportunity,
} = require("./opportunity.controller");

opportunityRoutes.post("/", authorize("create-opportunity"), createOpportunity);
opportunityRoutes.get("/", authorize("readAll-opportunity"), getAllOpportunity);
opportunityRoutes.get(
  "/:id",
  authorize("readSingle-opportunity"),
  getSingleOpportunity
);
opportunityRoutes.put(
  "/:id",
  authorize("update-opportunity"),
  updateOpportunity
);
opportunityRoutes.patch(
  "/:id",
  authorize("delete-opportunity"),
  deleteOpportunity
);

module.exports = opportunityRoutes;
