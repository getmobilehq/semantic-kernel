const prisma = require("../../../utils/prisma");

//create contact stage from contact stage schema
const createContactStage = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyContactStage = await prisma.contactStage.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deleteManyContactStage);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query.query === "createmany") {
    try {
      const createManyContactStage = await prisma.contactStage.createMany({
        data: req.body,
        skipDuplicates: true,
      });
      return res.status(201).json(createManyContactStage);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const newContactStage = await prisma.contactStage.create({
        data: {
          contactStageName: req.body.contactStageName,
        },
      });
      return res.status(200).json(newContactStage);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

//get all contact stage
const getAllContactStage = async (req, res) => {
  try {
    const getAllContactStage = await prisma.contactStage.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        contact: true,
      },
    });

    getAllContactStage.map((contactStage) => {
      contactStage.contact.map((contact) => {
        contact.fullName = contact.firstName + " " + contact.lastName;
      });
    });
    return res.status(200).json(getAllContactStage);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get single contact stage
const getSingleContactStage = async (req, res) => {
  try {
    const getSingleContactStage = await prisma.contactStage.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        contact: true,
      },
    });
    return res.status(200).json(getSingleContactStage);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//update contact stage
const updateContactStage = async (req, res) => {
  try {
    const updateContactStage = await prisma.contactStage.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        contactStageName: req.body.contactStageName,
      },
    });
    return res.status(200).json(updateContactStage);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//delete contact stage
const deleteContactStage = async (req, res) => {
  try {
    const deleteContactStage = await prisma.contactStage.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    return res.status(200).json(deleteContactStage);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createContactStage,
  getAllContactStage,
  getSingleContactStage,
  updateContactStage,
  deleteContactStage,
};
