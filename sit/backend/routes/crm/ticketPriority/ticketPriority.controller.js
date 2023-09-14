const { getPagination } = require("../../../utils/query");
const prisma = require("../../../utils/prisma");

//create ticket priority
const createTicketPriority = async (req, res) => {
  try {
    const createTicketPriority = await prisma.ticketPriority.create({
      data: {
        ticketPriorityName: req.body.ticketPriorityName,
      },
    });
    return res.status(200).json(createTicketPriority);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get all ticket priority
const getAllTicketPriority = async (req, res) => {
  try {
    const getAllTicketPriority = await prisma.ticketPriority.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return res.status(200).json(getAllTicketPriority);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get single ticket priority
const getSingleTicketPriority = async (req, res) => {
  try {
    const getSingleTicketPriority = await prisma.ticketPriority.findUnique({
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

    getSingleTicketPriority.ticket.map((item) => {
      item.customer.fullName =
        item.customer.firstName + " " + item.customer.lastName;
    });

    return res.status(200).json(getSingleTicketPriority);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//update ticket priority
const updateTicketPriority = async (req, res) => {
  try {
    const updateTicketPriority = await prisma.ticketPriority.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        ticketPriorityName: req.body.ticketPriorityName,
      },
    });
    return res.status(200).json(updateTicketPriority);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//delete ticket priority
const deleteTicketPriority = async (req, res) => {
  try {
    const deleteTicketPriority = await prisma.ticketPriority.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    return res.status(200).json(deleteTicketPriority);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTicketPriority,
  getAllTicketPriority,
  getSingleTicketPriority,
  updateTicketPriority,
  deleteTicketPriority,
};
