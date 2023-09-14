const express = require("express");
const {
  customerLogin,
  resetPassword,
  createSingleCustomer,
  getAllCustomer,
  getSingleCustomer,
  updateSingleCustomer,
  deleteSingleCustomer,
  forgotPassword,
} = require("./customer.controller");
const authorize = require("../../../utils/authorize"); // authentication middleware

const customerRoutes = express.Router();
customerRoutes.post("/login", customerLogin);
customerRoutes.patch(
  "/reset-password/:id",
  authorize("update-customer"),
  resetPassword
);
customerRoutes.patch("/forgot-password", forgotPassword);
customerRoutes.post("/register", createSingleCustomer);
customerRoutes.get("/", authorize("readAll-customer"), getAllCustomer);
customerRoutes.get("/:id", authorize("readSingle-customer"), getSingleCustomer);
customerRoutes.put("/:id", authorize("update-customer"), updateSingleCustomer);
customerRoutes.patch(
  "/:id",
  authorize("delete-customer"),
  deleteSingleCustomer
);

module.exports = customerRoutes;
