const { getPagination } = require("../../../utils/query");
const prisma = require("../../../utils/prisma");

//create crmTaskPriority
const createCrmTaskPriority = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyCrmTaskPriority = await prisma.crmTaskPriority.deleteMany(
        {
          where: {
            id: {
              in: req.body,
            },
          },
        }
      );
      return res.status(200).json(deleteManyCrmTaskPriority);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query.query === "createmany") {
    try {
      const createManyCrmTaskPriority = await prisma.crmTaskPriority.createMany(
        {
          data: req.body,
          skipDuplicates: true,
        }
      );
      return res.status(201).json(createManyCrmTaskPriority);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const createCrmTaskPriority = await prisma.crmTaskPriority.create({
        data: {
          taskPriorityName: req.body.taskPriorityName,
        },
      });
      return res.status(201).send(createCrmTaskPriority);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
};

//get all crmTaskPriority
const getAllCrmTaskPriority = async (req, res) => {
  try {
    const getAllCrmTaskPriority = await prisma.crmTaskPriority.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        crmTask: true,
      },
    });
    return res.status(200).json(getAllCrmTaskPriority);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//get single crmTaskPriority
const getSingleCrmTaskPriority = async (req, res) => {
  try {
    const getSingleCrmTaskPriority = await prisma.crmTaskPriority.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        crmTask: true,
      },
    });
    return res.status(200).json(getSingleCrmTaskPriority);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//update crmTaskPriority
const updateCrmTaskPriority = async (req, res) => {
  try {
    const updateCrmTaskPriority = await prisma.crmTaskPriority.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        taskPriorityName: req.body.taskPriorityName,
      },
    });
    return res.status(200).json(updateCrmTaskPriority);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//delete crmTaskPriority
const deleteCrmTaskPriority = async (req, res) => {
  try {
    const deleteCrmTaskPriority = await prisma.crmTaskPriority.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (deleteCrmTaskPriority) {
      return res
        .status(200)
        .json({ message: "CrmTaskPriority Deleted Successfully" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCrmTaskPriority,
  getAllCrmTaskPriority,
  getSingleCrmTaskPriority,
  updateCrmTaskPriority,
  deleteCrmTaskPriority,
};
