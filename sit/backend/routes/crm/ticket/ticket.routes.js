const express = require("express");
const ticketRoutes = express.Router();
const crypto = require("crypto"); // for generating random names
const multer = require("multer");
const {
  createTicket,
  getAllTicket,
  getSingleTicket,
  getAllTicketByCustomerId,
  updateTicket,
  deleteTicket,
} = require("./ticket.controller");
const authorize = require("../../../utils/authorize");
// generate random file name for extra security on naming
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

// store files upload folder in disk
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "routes/files/uploads/");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();
    if (
      extension !== ".jpg" &&
      extension !== ".jpeg" &&
      extension !== ".png" &&
      extension !== ".pdf"
    ) {
      return cb(new Error("Only images and pdf are allowed"));
    } else if (extension === ".pdf") {
      const uniqueSuffix = generateFileName();
      cb(null, uniqueSuffix + ".pdf");
    } else if (extension === ".png") {
      const uniqueSuffix = generateFileName();
      cb(null, uniqueSuffix + ".png");
    } else {
      const uniqueSuffix = generateFileName();
      cb(null, uniqueSuffix + ".jpg");
    }
  },
});
// multer middleware
const upload = multer({ storage: storage });

ticketRoutes.post(
  "/",
  upload.array("files", 4),
  authorize("create-ticket"),
  createTicket
);
ticketRoutes.get("/", authorize("readAll-ticket"), getAllTicket);
ticketRoutes.get("/:id", authorize("readSingle-ticket"), getSingleTicket);
ticketRoutes.get(
  "/customer/:id",
  authorize("readAll-ticket"),
  getAllTicketByCustomerId
);
ticketRoutes.put("/:id", authorize("update-ticket"), updateTicket);
ticketRoutes.delete("/:id", authorize("delete-ticket"), deleteTicket);

module.exports = ticketRoutes;
