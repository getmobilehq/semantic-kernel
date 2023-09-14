const express = require("express");
const ticketPriorityRoutes = express.Router();
const {
  createTicketPriority,
  getAllTicketPriority,
  getSingleTicketPriority,
  updateTicketPriority,
  deleteTicketPriority,
} = require("./ticketPriority.controller");
const authorize = require("../../../utils/authorize");

ticketPriorityRoutes.post(
  "/",
  authorize("create-ticketPriority"),
  createTicketPriority
);
ticketPriorityRoutes.get(
  "/",
  authorize("readAll-ticketPriority"),
  getAllTicketPriority
);
ticketPriorityRoutes.get(
  "/:id",
  authorize("readSingle-ticketPriority"),
  getSingleTicketPriority
);
ticketPriorityRoutes.put(
  "/:id",
  authorize("update-ticketPriority"),
  updateTicketPriority
);
ticketPriorityRoutes.delete(
  "/:id",
  authorize("delete-ticketPriority"),
  deleteTicketPriority
);

module.exports = ticketPriorityRoutes;
