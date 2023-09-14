const { getPagination } = require("../../../utils/query");
const prisma = require("../../../utils/prisma");

//create quote
const createQuote = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyQuote = await prisma.quote.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deleteManyQuote);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const totalPrice = req.body.quoteProduct
        .map((item) => item.unitPrice * item.productQuantity)
        .reduce((a, b) => a + b, 0);
      const totalAmount =
        totalPrice - parseInt(req.body.discount)
          ? totalPrice - parseInt(req.body.discount)
          : totalPrice;

      const createQuote = await prisma.quote.create({
        data: {
          quoteOwner: {
            connect: {
              id: parseInt(req.body.quoteOwnerId),
            },
          },
          quoteName: req.body.quoteName,
          quoteDate: new Date(req.body.quoteDate),
          opportunity: parseInt(req.body.opportunityId)
            ? {
                connect: {
                  id: parseInt(req.body.opportunityId),
                },
              }
            : undefined,
          company: parseInt(req.body.companyId)
            ? {
                connect: {
                  id: parseInt(req.body.companyId),
                },
              }
            : undefined,
          contact: parseInt(req.body.contactId)
            ? {
                connect: {
                  id: parseInt(req.body.contactId),
                },
              }
            : undefined,
          quoteProduct: {
            create: req.body.quoteProduct.map((item) => ({
              product: {
                connect: {
                  id: parseInt(item.productId),
                },
              },
              productQuantity: parseInt(item.productQuantity)
                ? parseInt(item.productQuantity)
                : undefined,
              unitPrice: parseFloat(item.unitPrice)
                ? parseFloat(item.unitPrice)
                : undefined,
            })),
          },
          discount: parseInt(req.body.discount)
            ? parseInt(req.body.discount)
            : undefined,
          totalAmount: totalAmount ? totalAmount : undefined,
          expirationDate: new Date(req.body.expirationDate),
          quoteStage: parseInt(req.body.quoteStageId)
            ? {
                connect: {
                  id: parseInt(req.body.quoteStageId),
                },
              }
            : undefined,
          termsAndConditions: req.body.termsAndConditions
            ? req.body.termsAndConditions
            : undefined,
          description: req.body.description ? req.body.description : undefined,
        },
      });
      return res.status(201).json(createQuote);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};

//get all quotes
const getAllQuote = async (req, res) => {
  if (req.query.query === "all") {
    try {
      const getAllQuote = await prisma.quote.findMany({
        orderBy: {
          id: "desc",
        },
        include: {
          quoteOwner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          company: {
            select: {
              id: true,
              companyName: true,
            },
          },
        },
      });

      //concat first name and last name
      getAllQuote.map((item) => {
        item.quoteOwner.fullName =
          item.quoteOwner.firstName + " " + item.quoteOwner.lastName;
      });

      return res.status(200).json(getAllQuote);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else if (req.query.query === "search") {
    try {
      const { skip, limit } = getPagination(req.query);
      const getAllQuote = await prisma.quote.findMany({
        orderBy: {
          id: "desc",
        },
        where: {
          OR: [
            {
              quoteName: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          quoteOwner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          company: {
            select: {
              id: true,
              companyName: true,
            },
          },
        },
        skip: Number(skip),
        take: Number(limit),
      });

      const response = {
        getAllQuote: getAllQuote,
        totalQuoteCount: {
          _count: {
            id: getAllQuote.length,
          },
        },
      };
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query) {
    const boolenStatus = req.query.status?.split(",").map(JSON.parse);

    if (boolenStatus.length === 2) {
      try {
        const { skip, limit } = getPagination(req.query);
        const getAllQuote = await prisma.quote.findMany({
          orderBy: {
            id: "desc",
          },
          where: {
            quoteOwnerId: {
              in: req.query.quoteOwner?.split(",").map(Number)
                ? req.query.quoteOwner?.split(",").map(Number)
                : undefined,
            },
            quoteStageId: {
              in: req.query.quoteStage?.split(",").map(Number)
                ? req.query.quoteStage?.split(",").map(Number)
                : undefined,
            },
            opportunityId: {
              in: req.query.opportunity?.split(",").map(Number)
                ? req.query.opportunity?.split(",").map(Number)
                : undefined,
            },
            companyId: {
              in: req.query.company?.split(",").map(Number)
                ? req.query.company?.split(",").map(Number)
                : undefined,
            },
            contactId: {
              in: req.query.contact?.split(",").map(Number)
                ? req.query.contact?.split(",").map(Number)
                : undefined,
            },
            OR: [
              { status: { equals: boolenStatus[0] } },
              { status: { equals: boolenStatus[1] } },
            ],
          },
          include: {
            quoteOwner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            company: {
              select: {
                id: true,
                companyName: true,
              },
            },
          },

          skip: Number(skip),
          take: Number(limit),
        });

        const totalQuoteCount = await prisma.quote.aggregate({
          where: {
            quoteOwnerId: {
              in: req.query.quoteOwner?.split(",").map(Number)
                ? req.query.quoteOwner?.split(",").map(Number)
                : undefined,
            },
            quoteStageId: {
              in: req.query.quoteStage?.split(",").map(Number)
                ? req.query.quoteStage?.split(",").map(Number)
                : undefined,
            },
            opportunityId: {
              in: req.query.opportunity?.split(",").map(Number)
                ? req.query.opportunity?.split(",").map(Number)
                : undefined,
            },
            companyId: {
              in: req.query.company?.split(",").map(Number)
                ? req.query.company?.split(",").map(Number)
                : undefined,
            },
            contactId: {
              in: req.query.contact?.split(",").map(Number)
                ? req.query.contact?.split(",").map(Number)
                : undefined,
            },
            OR: [
              { status: { equals: boolenStatus[0] } },
              { status: { equals: boolenStatus[1] } },
            ],
          },
          _count: {
            id: true,
          },
        });

        return res.status(200).json({
          getAllQuote,
          totalQuoteCount,
        });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    } else if (boolenStatus.length === 1) {
      try {
        const { skip, limit } = getPagination(req.query);
        const getAllQuote = await prisma.quote.findMany({
          orderBy: {
            id: "desc",
          },
          where: {
            quoteOwnerId: {
              in: req.query.quoteOwner?.split(",").map(Number)
                ? req.query.quoteOwner?.split(",").map(Number)
                : undefined,
            },
            quoteStageId: {
              in: req.query.quoteStage?.split(",").map(Number)
                ? req.query.quoteStage?.split(",").map(Number)
                : undefined,
            },
            opportunityId: {
              in: req.query.opportunity?.split(",").map(Number)
                ? req.query.opportunity?.split(",").map(Number)
                : undefined,
            },
            companyId: {
              in: req.query.company?.split(",").map(Number)
                ? req.query.company?.split(",").map(Number)
                : undefined,
            },
            contactId: {
              in: req.query.contact?.split(",").map(Number)
                ? req.query.contact?.split(",").map(Number)
                : undefined,
            },
            status: {
              equals: req.query.status
                ? JSON.parse(req.query.status)
                : undefined,
            },
          },
          include: {
            quoteOwner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            company: {
              select: {
                id: true,
                companyName: true,
              },
            },
          },

          skip: Number(skip),
          take: Number(limit),
        });

        const totalQuoteCount = await prisma.quote.aggregate({
          where: {
            quoteOwnerId: {
              in: req.query.quoteOwner?.split(",").map(Number)
                ? req.query.quoteOwner?.split(",").map(Number)
                : undefined,
            },
            quoteStageId: {
              in: req.query.quoteStage?.split(",").map(Number)
                ? req.query.quoteStage?.split(",").map(Number)
                : undefined,
            },
            opportunityId: {
              in: req.query.opportunity?.split(",").map(Number)
                ? req.query.opportunity?.split(",").map(Number)
                : undefined,
            },
            companyId: {
              in: req.query.company?.split(",").map(Number)
                ? req.query.company?.split(",").map(Number)
                : undefined,
            },
            contactId: {
              in: req.query.contact?.split(",").map(Number)
                ? req.query.contact?.split(",").map(Number)
                : undefined,
            },
            status: JSON.parse(req.query.status),
          },
          _count: {
            id: true,
          },
        });

        return res.status(200).json({
          getAllQuote,
          totalQuoteCount,
        });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }
};

//get single quote
const getSingleQuote = async (req, res) => {
  try {
    const getSingleQuote = await prisma.quote.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        quoteOwner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        company: {
          include: {
            companyOwner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        contact: {
          include: {
            contactOwner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        quoteProduct: {
          include: {
            product: {
              select: {
                id: true,
                productName: true,
              },
            },
          },
        },
        quoteStage: true,
        opportunity: {
          include: {
            opportunityOwner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            opportunityStage: {
              select: {
                id: true,
                opportunityStageName: true,
              },
            },
            opportunityType: {
              select: {
                id: true,
                opportunityTypeName: true,
              },
            },
            opportunitySource: {
              select: {
                id: true,
                opportunitySourceName: true,
              },
            },
          },
        },
        note: {
          include: {
            noteOwner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        attachment: {
          include: {
            attachmentOwner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        crmEmail: {
          include: {
            emailOwner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        crmTask: {
          include: {
            taskType: {
              select: {
                id: true,
                taskTypeName: true,
              },
            },
            taskPriority: {
              select: {
                id: true,
                taskPriorityName: true,
              },
            },
            taskStatus: {
              select: {
                id: true,
                taskStatusName: true,
              },
            },
            assignee: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            opportunity: {
              select: {
                id: true,
                opportunityName: true,
              },
            },
            contact: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            quote: {
              select: {
                id: true,
                quoteName: true,
              },
            },
          },
        },
      },
    });

    if(getSingleQuote.quoteOwner !== null) {
      getSingleQuote.quoteOwner.fullName =
        getSingleQuote.quoteOwner.firstName +
        " " +
        getSingleQuote.quoteOwner.lastName;
    }
    if(getSingleQuote.opportunity !== null){
      getSingleQuote.opportunity.opportunityOwner.fullName =
        getSingleQuote.opportunity.opportunityOwner.firstName +
        " " +
        getSingleQuote.opportunity.opportunityOwner.lastName;
    }

    if(getSingleQuote.company !== null) {
      getSingleQuote.company.companyOwner.fullName =
        getSingleQuote.company.companyOwner.firstName +
        " " +
        getSingleQuote.company.companyOwner.lastName;
    }
    if(getSingleQuote.contact !== null) {
      getSingleQuote.contact.contactOwner.fullName =
        getSingleQuote.contact.contactOwner.firstName +
        " " +
        getSingleQuote.contact.contactOwner.lastName;
    }

    getSingleQuote.note.map((note) => {
      note.noteOwner.fullName =
        note.noteOwner.firstName + " " + note.noteOwner.lastName;
    });

    getSingleQuote.attachment.map((attachment) => {
      attachment.attachmentOwner.fullName =
        attachment.attachmentOwner.firstName +
        " " +
        attachment.attachmentOwner.lastName;
    });

    getSingleQuote.crmEmail.map((email) => {
      email.emailOwner.fullName =
        email.emailOwner.firstName + " " + email.emailOwner.lastName;
    });
    return res.status(200).json(getSingleQuote);
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: error.message });
  }
};

//update quote
const updateQuote = async (req, res) => {
  try {
    //update expiration date or quote date or both according to the request body
    if (req.body.expirationDate && req.body.quoteDate) {
      req.body.expirationDate = new Date(req.body.expirationDate);
      req.body.quoteDate = new Date(req.body.quoteDate);
    } else if (req.body.expirationDate) {
      req.body.expirationDate = new Date(req.body.expirationDate);
    } else if (req.body.quoteDate) {
      req.body.quoteDate = new Date(req.body.quoteDate);
    }

    let updateQuote;
    if (req.body.quoteProduct) {
      //update total amount
      req.body.totalAmount =
        req.body.quoteProduct
          .map((element) => element.unitPrice * element.productQuantity)
          .reduce((a, b) => a + b, 0) - parseInt(req.body.discount);

      updateQuote = await prisma.quote.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          quoteOwner: {
            connect: {
              id: req.body.quoteOwnerId,
            },
          },
          quoteName: req.body.quoteName,
          quoteDate: req.body.quoteDate,
          opportunity: {
            connect: {
              id: req.body.opportunityId,
            },
          },
          company: {
            connect: {
              id: req.body.companyId,
            },
          },
          contact: {
            connect: {
              id: req.body.contactId,
            },
          },
          expirationDate: req.body.expirationDate,
          quoteStage: {
            connect: {
              id: req.body.quoteStageId,
            },
          },
          termsAndConditions: req.body.termsAndConditions,
          description: req.body.description,
          discount: req.body.discount,
          totalAmount: req.body.totalAmount,
          quoteProduct: {
            deleteMany: {},
            create: req.body.quoteProduct,
          },
        },
      });
    } else {
      updateQuote = await prisma.quote.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: req.body,
      });
    }

    return res.status(200).json(updateQuote);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//delete quote
const deleteQuote = async (req, res) => {
  try {
    await prisma.quote.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        status: req.body.status,
      },
    });
    return res
      .status(200)
      .json({ message: `Status has been updated to ${req.body.status}` });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createQuote,
  getAllQuote,
  getSingleQuote,
  updateQuote,
  deleteQuote,
};
