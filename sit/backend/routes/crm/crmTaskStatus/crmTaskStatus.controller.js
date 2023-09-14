const { getPagination } = require("../../../utils/query");
const prisma = require("../../../utils/prisma");

//create crmTaskStatus
const createCrmTaskStatus = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyCrmTaskStatus = await prisma.crmTaskStatus.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deleteManyCrmTaskStatus);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query.query === "createmany") {
    try {
      const createManyCrmTaskStatus = await prisma.crmTaskStatus.createMany({
        data: req.body,
        skipDuplicates: true,
      });
      return res.status(201).json(createManyCrmTaskStatus);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const createCrmTaskStatus = await prisma.crmTaskStatus.create({
        data: {
          taskStatusName: req.body.taskStatusName,
        },
      });
      return res.status(201).send(createCrmTaskStatus);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
};

//get all crmTaskStatus
const getAllCrmTaskStatus = async (req, res) => {
  try {
    const getAllCrmTaskStatus = await prisma.crmTaskStatus.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        crmTask: true,
      },
    });
    return res.status(200).json(getAllCrmTaskStatus);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//get single crmTaskStatus
const getSingleCrmTaskStatus = async (req, res) => {
  try {
    const getSingleCrmTaskStatus = await prisma.crmTaskStatus.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        crmTask: true,
      },
    });
    return res.status(200).json(getSingleCrmTaskStatus);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//update crmTaskStatus
const updateCrmTaskStatus = async (req, res) => {
  try {
    const updateCrmTaskStatus = await prisma.crmTaskStatus.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        taskStatusName: req.body.taskStatusName,
      },
    });
    return res.status(200).json(updateCrmTaskStatus);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//delete crmTaskStatus
const deleteCrmTaskStatus = async (req, res) => {
  try {
    const deleteCrmTaskStatus = await prisma.crmTaskStatus.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (deleteCrmTaskStatus) {
      return res
        .status(204)
        .send({ message: "crmTaskStatus Deleted Successfully" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCrmTaskStatus,
  getAllCrmTaskStatus,
  getSingleCrmTaskStatus,
  updateCrmTaskStatus,
  deleteCrmTaskStatus,
};
