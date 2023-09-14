const prisma = require("../../../utils/prisma");

//create opportunityStage
const createOpportunityStage = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyOpportunityStage =
        await prisma.opportunityStage.deleteMany({
          where: {
            id: {
              in: req.body,
            },
          },
        });
      return res.status(200).json(deleteManyOpportunityStage);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query.query === "createmany") {
    try {
      const createManyOpportunityStage =
        await prisma.opportunityStage.createMany({
          data: req.body,
          skipDuplicates: true,
        });
      return res.status(201).json(createManyOpportunityStage);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const createOpportunityStage = await prisma.opportunityStage.create({
        data: {
          opportunityStageName: req.body.opportunityStageName,
        },
      });
      return res.status(201).send(createOpportunityStage);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
};

//get all opportunityStage
const getAllOpportunityStage = async (req, res) => {
  try {
    const getAllOpportunityStage = await prisma.opportunityStage.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        opportunity: true,
      },
    });
    return res.status(200).json(getAllOpportunityStage);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//get single opportunityStage
const getSingleOpportunityStage = async (req, res) => {
  try {
    const getSingleOpportunityStage = await prisma.opportunityStage.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        opportunity: true,
      },
    });
    return res.status(200).json(getSingleOpportunityStage);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//update opportunityStage
const updateOpportunityStage = async (req, res) => {
  try {
    const updateOpportunityStage = await prisma.opportunityStage.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        opportunityStageName: req.body.opportunityStageName,
      },
    });
    return res.status(200).json(updateOpportunityStage);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//delete opportunityStage
const deleteOpportunityStage = async (req, res) => {
  try {
    const deleteOpportunityStage = await prisma.opportunityStage.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (deleteOpportunityStage) {
      return res
        .status(200)
        .json({ message: "OpportunityStage Deleted Successfully" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOpportunityStage,
  getAllOpportunityStage,
  getSingleOpportunityStage,
  updateOpportunityStage,
  deleteOpportunityStage,
};
