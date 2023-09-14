const prisma = require("../../../utils/prisma");

//create source
const createOpportunitySource = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyOpportunitySource =
        await prisma.opportunitySource.deleteMany({
          where: {
            id: {
              in: req.body,
            },
          },
        });
      return res.status(200).json(deleteManyOpportunitySource);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else if (req.query.query === "createmany") {
    try {
      const createManyOpportunitySource =
        await prisma.opportunitySource.createMany({
          data: req.body,
          skipDuplicates: true,
        });
      return res.status(201).json(createManyOpportunitySource);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    try {
      const createOpportunitySource = await prisma.opportunitySource.create({
        data: {
          opportunitySourceName: req.body.opportunitySourceName,
        },
      });
      return res.status(201).send(createOpportunitySource);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
};

//get all source
const getAllOpportunitySource = async (req, res) => {
  try {
    const getAllOpportunity = await prisma.opportunitySource.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        opportunity: true,
      },
    });
    return res.status(200).json(getAllOpportunity);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//get single source
const getSingleOpportunitySource = async (req, res) => {
  try {
    const getSingleOpportunity = await prisma.opportunitySource.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        opportunity: true,
      },
    });
    return res.status(200).json(getSingleOpportunity);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//update source
const updateOpportunitySource = async (req, res) => {
  try {
    const updateOpportunity = await prisma.opportunitySource.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        opportunitySourceName: req.body.opportunitySourceName,
      },
    });
    return res.status(200).json(updateOpportunity);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//delete source
const deleteOpportunitySource = async (req, res) => {
  try {
    const deleteOpportunity = await prisma.opportunitySource.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (deleteOpportunity) {
      return res
        .status(200)
        .json({ message: "OpportunitySource Deleted Successfully" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOpportunitySource,
  getAllOpportunitySource,
  getSingleOpportunitySource,
  updateOpportunitySource,
  deleteOpportunitySource,
};
