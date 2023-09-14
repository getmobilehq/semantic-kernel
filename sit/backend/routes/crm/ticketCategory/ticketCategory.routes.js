const express = require("express");
const ticketCategoryRoutes = express.Router();
const {
  createTicketCategory,
  getAllTicketCategory,
  getSingleTicketCategory,
  updateTicketCategory,
  deleteTicketCategory,
} = require("./ticketCategory.controller");
const authorize = require("../../../utils/authorize");

ticketCategoryRoutes.post(
  "/",
  authorize("create-ticketCategory"),
  createTicketCategory
);
ticketCategoryRoutes.get(
  "/",
  authorize("readAll-ticketCategory"),
  getAllTicketCategory
);
ticketCategoryRoutes.get(
  "/:id",
  authorize("readSingle-ticketCategory"),
  getSingleTicketCategory
);
ticketCategoryRoutes.put(
  "/:id",
  authorize("update-ticketCategory"),
  updateTicketCategory
);
ticketCategoryRoutes.delete(
  "/:id",
  authorize("delete-ticketCategory"),
  deleteTicketCategory
);

module.exports = ticketCategoryRoutes;
