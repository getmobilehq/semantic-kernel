const express = require("express");
const crmTaskStatusRoutes = express.Router();
const {
  createCrmTaskStatus,
  getAllCrmTaskStatus,
  getSingleCrmTaskStatus,
  updateCrmTaskStatus,
  deleteCrmTaskStatus,
} = require("./crmTaskStatus.controller");
const authorize = require("../../../utils/authorize");
crmTaskStatusRoutes.post(
  "/",
  authorize("create-crmTaskStatus"),
  createCrmTaskStatus
);
crmTaskStatusRoutes.get(
  "/",
  authorize("readAll-crmTaskStatus"),
  getAllCrmTaskStatus
);
crmTaskStatusRoutes.get(
  "/:id",
  authorize("readSingle-crmTaskStatus"),
  getSingleCrmTaskStatus
);
crmTaskStatusRoutes.put(
  "/:id",
  authorize("update-crmTaskStatus"),
  updateCrmTaskStatus
);
crmTaskStatusRoutes.delete(
  "/:id",
  authorize("delete-crmTaskStatus"),
  deleteCrmTaskStatus
);

module.exports = crmTaskStatusRoutes;
