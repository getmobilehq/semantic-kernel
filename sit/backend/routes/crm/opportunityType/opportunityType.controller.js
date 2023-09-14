const prisma = require("../../../utils/prisma");

//create opportunityType
const createOpportunityType = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyOpportunityType = await prisma.opportunityType.deleteMany(
        {
          where: {
            id: {
              in: req.body,
            },
          },
        }
      );
      return res.status(200).json(deleteManyOpportunityType);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query.query === "createmany") {
    try {
      const createManyOpportunityType = await prisma.opportunityType.createMany(
        {
          data: req.body,
          skipDuplicates: true,
        }
      );
      return res.status(201).json(createManyOpportunityType);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const createOpportunityType = await prisma.opportunityType.create({
        data: {
          opportunityTypeName: req.body.opportunityTypeName,
        },
      });
      return res.status(201).send(createOpportunityType);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
};

//get all opportunityType
const getAllOpportunityType = async (req, res) => {
  try {
    const getAllOpportunityType = await prisma.opportunityType.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        opportunity: true,
      },
    });
    return res.status(200).json(getAllOpportunityType);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//get single opportunityType
const getSingleOpportunityType = async (req, res) => {
  try {
    const getSingleOpportunityType = await prisma.opportunityType.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        opportunity: true,
      },
    });
    return res.status(200).json(getSingleOpportunityType);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//update opportunityType
const updateOpportunityType = async (req, res) => {
  try {
    const updateOpportunityType = await prisma.opportunityType.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        opportunityTypeName: req.body.opportunityTypeName,
      },
    });
    return res.status(200).json(updateOpportunityType);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//delete opportunityType
const deleteOpportunityType = async (req, res) => {
  try {
    const deleteOpportunityType = await prisma.opportunityType.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (deleteOpportunityType) {
      return res
        .status(200)
        .json({ message: "OpportunityType Deleted Successfully" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOpportunityType,
  getAllOpportunityType,
  getSingleOpportunityType,
  updateOpportunityType,
  deleteOpportunityType,
};
