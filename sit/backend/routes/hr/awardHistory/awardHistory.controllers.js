const prisma = require("../../../utils/prisma");

const createSingleAwardHistory = async (req, res) => {
  try {
    if (req.query.query === "deletemany") {
      const deletedAwardHistory = await prisma.awardHistory.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      res.json(deletedAwardHistory);
    } else {
      const createdAwardHistory = await prisma.awardHistory.create({
        data: {
          userId: req.body.userId,
          awardId: req.body.awardId,
          awardedDate: new Date(req.body.awardedDate),
          comment: req.body.comment,
        },
      });
      return res.status(201).json(createdAwardHistory);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const getAllAwardHistory = async (req, res) => {
  try {
    const allAwardHistory = await prisma.awardHistory.findMany({
      orderBy: [
        {
          id: "asc",
        },
      ],
    });
    return res.json(allAwardHistory);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const getSingleAwardHistory = async (req, res) => {
  try {
    const singleAwardHistory = await prisma.awardHistory.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.json(singleAwardHistory);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const updateSingleAwardHistory = async (req, res) => {
  try {
    const updatedAwardHistory = await prisma.awardHistory.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        awardId: req.body.awardId,
        awardedDate: new Date(req.body.awardedDate),
        comment: req.body.comment,
      },
    });
    return res.json(updatedAwardHistory);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deleteSingleAwardHistory = async (req, res) => {
  try {
    const deletedAwardHistory = await prisma.awardHistory.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.status(200).json(deletedAwardHistory);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  createSingleAwardHistory,
  getAllAwardHistory,
  getSingleAwardHistory,
  updateSingleAwardHistory,
  deleteSingleAwardHistory,
};
