const prisma = require("../../../utils/prisma");

//create quoteStage
const createQuoteStage = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyQuoteStage = await prisma.quoteStage.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deleteManyQuoteStage);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query.query === "createmany") {
    try {
      const createManyQuoteStage = await prisma.quoteStage.createMany({
        data: req.body,
        skipDuplicates: true,
      });
      return res.status(201).json(createManyQuoteStage);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const createQuoteStage = await prisma.quoteStage.create({
        data: {
          quoteStageName: req.body.quoteStageName,
        },
      });
      return res.status(201).send(createQuoteStage);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
};

//get all quoteStages
const getAllQuoteStages = async (req, res) => {
  try {
    const getAllQuoteStages = await prisma.quoteStage.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        quote: true,
      },
    });
    return res.status(200).json(getAllQuoteStages);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//get single quoteStage
const getSingleQuoteStage = async (req, res) => {
  try {
    const getSingleQuoteStage = await prisma.quoteStage.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        quote: true,
      },
    });
    return res.status(200).json(getSingleQuoteStage);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//update quoteStage
const updateQuoteStage = async (req, res) => {
  try {
    const updateQuoteStage = await prisma.quoteStage.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        quoteStageName: req.body.quoteStageName,
      },
    });
    return res.status(200).json(updateQuoteStage);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//delete quoteStage
const deleteQuoteStage = async (req, res) => {
  try {
    const deleteQuoteStage = await prisma.quoteStage.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (deleteQuoteStage) {
      return res
        .status(200)
        .json({ message: "QuoteStage Deleted successfully" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createQuoteStage,
  getAllQuoteStages,
  getSingleQuoteStage,
  updateQuoteStage,
  deleteQuoteStage,
};
