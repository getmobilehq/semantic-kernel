const express = require("express");
const companyRoutes = express.Router();
const {
  createCompany,
  getAllCompany,
  getSingleCompany,
  updateCompany,
  deleteCompany,
} = require("./company.controller");
const authorize = require("../../../utils/authorize"); // authentication middleware

companyRoutes.post("/", authorize("create-company"), createCompany);
companyRoutes.get("/", authorize("readAll-company"), getAllCompany);
companyRoutes.get("/:id", authorize("readSingle-company"), getSingleCompany);
companyRoutes.put("/:id", authorize("update-company"), updateCompany);
companyRoutes.patch("/:id", authorize("delete-company"), deleteCompany);

module.exports = companyRoutes;
