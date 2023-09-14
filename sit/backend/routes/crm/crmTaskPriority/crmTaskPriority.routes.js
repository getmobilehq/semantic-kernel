const express = require("express");
const crmTaskPriorityRoutes = express.Router();
const {
  createCrmTaskPriority,
  getAllCrmTaskPriority,
  getSingleCrmTaskPriority,
  updateCrmTaskPriority,
  deleteCrmTaskPriority,
} = require("./crmTaskPriority.controller");
const authorize = require("../../../utils/authorize");
crmTaskPriorityRoutes.post(
  "/",
  authorize("create-crmTaskPriority"),
  createCrmTaskPriority
);
crmTaskPriorityRoutes.get(
  "/",
  authorize("readAll-crmTaskPriority"),
  getAllCrmTaskPriority
);
crmTaskPriorityRoutes.get(
  "/:id",
  authorize("readSingle-crmTaskPriority"),
  getSingleCrmTaskPriority
);
crmTaskPriorityRoutes.put(
  "/:id",
  authorize("update-crmTaskPriority"),
  updateCrmTaskPriority
);
crmTaskPriorityRoutes.delete(
  "/:id",
  authorize("delete-crmTaskPriority"),
  deleteCrmTaskPriority
);

module.exports = crmTaskPriorityRoutes;
