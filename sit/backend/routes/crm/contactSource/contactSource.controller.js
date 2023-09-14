const prisma = require("../../../utils/prisma");

//create contact source from contact source schema
const createContactSource = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyContactSource = await prisma.contactSource.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deleteManyContactSource);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query.query === "createmany") {
    try {
      const createManyContactSource = await prisma.contactSource.createMany({
        data: req.body,
        skipDuplicates: true,
      });
      return res.status(201).json(createManyContactSource);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const newContactSource = await prisma.contactSource.create({
        data: {
          contactSourceName: req.body.contactSourceName,
        },
      });
      return res.status(200).json(newContactSource);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

//get all contact source
const getAllContactSource = async (req, res) => {
  try {
    const getAllContactSource = await prisma.contactSource.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        contact: true,
      },
    });

    //contact first name and last name
    getAllContactSource.map((contactSource) => {
      contactSource.contact.map((contact) => {
        contact.fullName = contact.firstName + " " + contact.lastName;
      });
    });
    return res.status(200).json(getAllContactSource);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get single contact source
const getSingleContactSource = async (req, res) => {
  try {
    const getSingleContactSource = await prisma.contactSource.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        contact: true,
      },
    });
    return res.status(200).json(getSingleContactSource);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//update contact source
const updateContactSource = async (req, res) => {
  try {
    const updateContactSource = await prisma.contactSource.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        contactSourceName: req.body.contactSourceName,
      },
    });
    return res.status(200).json(updateContactSource);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//delete contact source
const deleteContactSource = async (req, res) => {
  try {
    const deleteContactSource = await prisma.contactSource.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    return res.status(200).json(deleteContactSource);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createContactSource,
  getAllContactSource,
  getSingleContactSource,
  updateContactSource,
  deleteContactSource,
};
