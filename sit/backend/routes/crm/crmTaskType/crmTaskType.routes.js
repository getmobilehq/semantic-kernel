const express = require("express");
const crmTaskTypeRoutes = express.Router();
const {
  createCrmTaskType,
  getAllCrmTaskType,
  getSingleCrmTaskType,
  updateCrmTaskType,
  deleteCrmTaskType,
} = require("./crmTaskType.controller");
const authorize = require("../../../utils/authorize");
crmTaskTypeRoutes.post("/", authorize("create-crmTaskType"), createCrmTaskType);
crmTaskTypeRoutes.get("/", authorize("readAll-crmTaskType"), getAllCrmTaskType);
crmTaskTypeRoutes.get(
  "/:id",
  authorize("readSingle-crmTaskType"),
  getSingleCrmTaskType
);
crmTaskTypeRoutes.put(
  "/:id",
  authorize("update-crmTaskType"),
  updateCrmTaskType
);
crmTaskTypeRoutes.delete(
  "/:id",
  authorize("delete-crmTaskType"),
  deleteCrmTaskType
);

module.exports = crmTaskTypeRoutes;
