const { getPagination } = require("../../../utils/query");
const prisma = require("../../../utils/prisma");

//create ticket category
const createTicketCategory = async (req, res) => {
  try {
    const createTicketCategory = await prisma.ticketCategory.create({
      data: {
        ticketCategoryName: req.body.ticketCategoryName,
      },
    });
    return res.status(200).json(createTicketCategory);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get all ticket category
const getAllTicketCategory = async (req, res) => {
  try {
    const getAllTicketCategory = await prisma.ticketCategory.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return res.status(200).json(getAllTicketCategory);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get single ticket category
const getSingleTicketCategory = async (req, res) => {
  try {
    const getSingleTicketCategory = await prisma.ticketCategory.findUnique({
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

    getSingleTicketCategory.ticket.map((item) => {
      item.customer.fullName =
        item.customer.firstName + " " + item.customer.lastName;
    });

    return res.status(200).json(getSingleTicketCategory);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//update ticket category

const updateTicketCategory = async (req, res) => {
  try {
    const updateTicketCategory = await prisma.ticketCategory.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        ticketCategoryName: req.body.ticketCategoryName,
      },
    });
    return res.status(200).json(updateTicketCategory);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//delete ticket category

const deleteTicketCategory = async (req, res) => {
  try {
    const deleteTicketCategory = await prisma.ticketCategory.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    return res.status(200).json(deleteTicketCategory);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTicketCategory,
  getAllTicketCategory,
  getSingleTicketCategory,
  updateTicketCategory,
  deleteTicketCategory,
};
