const express = require("express");
const crmTaskRoutes = express.Router();
const {
  createTask,
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("./crmTask.controller");
const authorize = require("../../../utils/authorize");
crmTaskRoutes.post("/", authorize("create-crmTask"), createTask);
crmTaskRoutes.get("/", authorize("readAll-crmTask"), getAllTask);
crmTaskRoutes.get("/:id", authorize("readSingle-crmTask"), getSingleTask);
crmTaskRoutes.put("/:id", authorize("update-crmTask"), updateTask);
crmTaskRoutes.patch("/:id", authorize("delete-crmTask"), deleteTask);

module.exports = crmTaskRoutes;
