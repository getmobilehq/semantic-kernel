const express = require("express");
const industryRoutes = express.Router();
const {
  createIndustry,
  getAllIndustry,
  getSingleIndustry,
  updateIndustry,
  deleteIndustry,
} = require("./industry.controller");
const authorize = require("../../../utils/authorize");
industryRoutes.post("/", authorize("create-industry"), createIndustry);
industryRoutes.get("/", authorize("readAll-industry"), getAllIndustry);
industryRoutes.get("/:id", authorize("readSingle-industry"), getSingleIndustry);
industryRoutes.put("/:id", authorize("update-industry"), updateIndustry);
industryRoutes.delete("/:id", authorize("delete-industry"), deleteIndustry);

module.exports = industryRoutes;
