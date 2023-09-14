const express = require("express");
const ticketStatusRoutes = express.Router();
const {
  createTicketStatus,
  getAllTicketStatus,
  getSingleTicketStatus,
  updateTicketStatus,
  deleteTicketStatus,
} = require("./ticketStatus.controller");
const authorize = require("../../../utils/authorize");

ticketStatusRoutes.post(
  "/",
  authorize("create-ticketStatus"),
  createTicketStatus
);
ticketStatusRoutes.get(
  "/",
  authorize("readAll-ticketStatus"),
  getAllTicketStatus
);
ticketStatusRoutes.get(
  "/:id",
  authorize("readSingle-ticketStatus"),
  getSingleTicketStatus
);
ticketStatusRoutes.put(
  "/:id",
  authorize("update-ticketStatus"),
  updateTicketStatus
);
ticketStatusRoutes.delete(
  "/:id",
  authorize("delete-ticketStatus"),
  deleteTicketStatus
);

module.exports = ticketStatusRoutes;
