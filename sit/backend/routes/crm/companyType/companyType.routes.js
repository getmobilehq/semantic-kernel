const express = require("express");
const companyTypeRoutes = express.Router();
const {
  createCompanyType,
  getAllCompanyType,
  getSingleCompanyType,
  updateCompanyType,
  deleteCompanyType,
} = require("./companyType.controller");
const authorize = require("../../../utils/authorize");

companyTypeRoutes.post("/", authorize("create-companyType"), createCompanyType);
companyTypeRoutes.get("/", authorize("readAll-companyType"), getAllCompanyType);
companyTypeRoutes.get(
  "/:id",
  authorize("readSingle-companyType"),
  getSingleCompanyType
);
companyTypeRoutes.put(
  "/:id",
  authorize("update-companyType"),
  updateCompanyType
);
companyTypeRoutes.delete(
  "/:id",
  authorize("delete-companyType"),
  deleteCompanyType
);

module.exports = companyTypeRoutes;
