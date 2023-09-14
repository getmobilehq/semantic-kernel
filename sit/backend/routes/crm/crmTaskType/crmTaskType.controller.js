const { getPagination } = require("../../../utils/query");
const prisma = require("../../../utils/prisma");

//create crmTaskType
const createCrmTaskType = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyCrmTaskType = await prisma.crmTaskType.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deleteManyCrmTaskType);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query.query === "createmany") {
    try {
      const createManyCrmTaskType = await prisma.crmTaskType.createMany({
        data: req.body,
        skipDuplicates: true,
      });
      return res.status(201).json(createManyCrmTaskType);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const createCrmTaskType = await prisma.crmTaskType.create({
        data: {
          taskTypeName: req.body.taskTypeName,
        },
      });
      return res.status(201).send(createCrmTaskType);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
};

//get all crmTaskType
const getAllCrmTaskType = async (req, res) => {
  try {
    const getAllCrmTaskType = await prisma.crmTaskType.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        crmTask: true,
      },
    });
    return res.status(200).json(getAllCrmTaskType);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//get single crmTaskType
const getSingleCrmTaskType = async (req, res) => {
  try {
    const getSingleCrmTaskType = await prisma.crmTaskType.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        crmTask: true,
      },
    });
    return res.status(200).json(getSingleCrmTaskType);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//update crmTaskType
const updateCrmTaskType = async (req, res) => {
  try {
    const updateCrmTaskType = await prisma.crmTaskType.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        taskTypeName: req.body.taskTypeName,
      },
    });
    return res.status(200).json(updateCrmTaskType);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//delete crmTaskType
const deleteCrmTaskType = async (req, res) => {
  try {
    const deleteCrmTaskType = await prisma.crmTaskType.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (deleteCrmTaskType) {
      return res
        .status(200)
        .json({ message: "crmTaskType Deleted Successfully" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCrmTaskType,
  getAllCrmTaskType,
  getSingleCrmTaskType,
  updateCrmTaskType,
  deleteCrmTaskType,
};
