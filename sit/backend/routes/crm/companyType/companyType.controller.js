const prisma = require("../../../utils/prisma");

//create company type from company type schema

const createCompanyType = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyCompanyType = await prisma.companyType.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deleteManyCompanyType);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query.query === "createmany") {
    try {
      const createManyCompanyType = await prisma.companyType.createMany({
        data: req.body,
        skipDuplicates: true,
      });
      return res.status(201).json(createManyCompanyType);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const createCompanyType = await prisma.companyType.create({
        data: {
          companyTypeName: req.body.companyTypeName,
        },
      });
      return res.status(201).json(createCompanyType);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

//get all company type
const getAllCompanyType = async (req, res) => {
  try {
    const getAllCompanyType = await prisma.companyType.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        company: true,
      },
    });
    return res.status(200).json(getAllCompanyType);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get single company type
const getSingleCompanyType = async (req, res) => {
  try {
    const getSingleCompanyType = await prisma.companyType.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        company: true,
      },
    });
    return res.status(200).json(getSingleCompanyType);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//update company type
const updateCompanyType = async (req, res) => {
  try {
    const updateCompanyType = await prisma.companyType.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        companyTypeName: req.body.companyTypeName,
      },
    });
    return res.status(200).json(updateCompanyType);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//delete company type
const deleteCompanyType = async (req, res) => {
  try {
    const deleteCompanyType = await prisma.companyType.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (deleteCompanyType) {
      return res
        .status(200)
        .json({ message: "CompanyType Deleted Successfully" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createCompanyType,
  getAllCompanyType,
  getSingleCompanyType,
  updateCompanyType,
  deleteCompanyType,
};
