const express = require("express");
const productRoutes = express.Router();
const authorize = require("../../../utils/authorize");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("./product.controller");

productRoutes.post("/", authorize("create-product"), createProduct);
productRoutes.get("/", authorize("readAll-product"), getAllProducts);
productRoutes.get("/:id", authorize("readSingle-product"), getSingleProduct);
productRoutes.put("/:id", authorize("update-product"), updateProduct);
productRoutes.delete("/:id", authorize("delete-product"), deleteProduct);

module.exports = productRoutes;
