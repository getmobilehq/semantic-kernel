const { getPagination } = require("../../../utils/query");
const prisma = require("../../../utils/prisma");

//create ticket status
const createTicketStatus = async (req, res) => {
  try {
    const createTicketStatus = await prisma.ticketStatus.create({
      data: {
        ticketStatusName: req.body.ticketStatusName,
      },
    });
    return res.status(200).json(createTicketStatus);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get all ticket status
const getAllTicketStatus = async (req, res) => {
  try {
    const getAllTicketStatus = await prisma.ticketStatus.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return res.status(200).json(getAllTicketStatus);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get single ticket status
const getSingleTicketStatus = async (req, res) => {
  try {
    const getSingleTicketStatus = await prisma.ticketStatus.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        ticket: {
          include: {
            customer: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    getSingleTicketStatus.ticket.map((item) => {
      item.customer.fullName =
        item.customer.firstName + " " + item.customer.lastName;
    });
    return res.status(200).json(getSingleTicketStatus);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//update ticket status
const updateTicketStatus = async (req, res) => {
  try {
    const updateTicketStatus = await prisma.ticketStatus.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        ticketStatusName: req.body.ticketStatusName,
      },
    });
    return res.status(200).json(updateTicketStatus);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//delete ticket status
const deleteTicketStatus = async (req, res) => {
  try {
    const deleteTicketStatus = await prisma.ticketStatus.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    return res.status(200).json(deleteTicketStatus);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTicketStatus,
  getAllTicketStatus,
  getSingleTicketStatus,
  updateTicketStatus,
  deleteTicketStatus,
};
