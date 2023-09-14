const express = require("express");
const quotesRoutes = express.Router();
const authorize = require("../../../utils/authorize");
const {
  createQuote,
  getAllQuote,
  getSingleQuote,
  updateQuote,
  deleteQuote,
} = require("./quote.controller");

quotesRoutes.post("/", authorize("create-quote"), createQuote);
quotesRoutes.get("/", authorize("readAll-quote"), getAllQuote);
quotesRoutes.get("/:id", authorize("readSingle-quote"), getSingleQuote);
quotesRoutes.put("/:id", authorize("update-quote"), updateQuote);
quotesRoutes.patch("/:id", authorize("delete-quote"), deleteQuote);

module.exports = quotesRoutes;
