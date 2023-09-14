const prisma = require("../../../utils/prisma");

//create industry from industry schema
const createIndustry = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyIndustry = await prisma.industry.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deleteManyIndustry);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query.query === "createmany") {
    try {
      const createManyIndustry = await prisma.industry.createMany({
        data: req.body,
        skipDuplicates: true,
      });
      return res.status(201).json(createManyIndustry);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const createIndustry = await prisma.industry.create({
        data: {
          industryName: req.body.industryName,
        },
      });
      return res.status(201).json(createIndustry);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

//get all industry
const getAllIndustry = async (req, res) => {
  try {
    const getAllIndustry = await prisma.industry.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        company: true,
      },
    });
    return res.status(200).json(getAllIndustry);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get single industry
const getSingleIndustry = async (req, res) => {
  try {
    const getSingleIndustry = await prisma.industry.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        company: true,
      },
    });
    return res.status(200).json(getSingleIndustry);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//update industry
const updateIndustry = async (req, res) => {
  try {
    const updateIndustry = await prisma.industry.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        industryName: req.body.industryName,
      },
    });
    return res.status(200).json(updateIndustry);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//delete industry
const deleteIndustry = async (req, res) => {
  try {
    const deleteIndustry = await prisma.industry.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (deleteIndustry) {
      return res.status(200).json({ message: "Industry Deleted Successfully" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createIndustry,
  getAllIndustry,
  getSingleIndustry,
  updateIndustry,
  deleteIndustry,
};
