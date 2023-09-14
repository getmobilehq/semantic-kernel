const {getPagination} = require("../../../utils/query");
const prisma = require("../../../utils/prisma");

//create opportunity
const createOpportunity = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyOpportunity = await prisma.opportunity.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deleteManyOpportunity);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  } else if (req.query.query === "createmany") {
    try {
      const dates = req.body.map((item) => {
        item.opportunityCreateDate = new Date(item.opportunityCreateDate);
        item.opportunityCloseDate = new Date(item.opportunityCloseDate);
        return item;
      });

      const createManyPromises = dates.map(async (item) => {
        const createManyOpportunity = await prisma.opportunity.createMany({
          data: item,
          skipDuplicates: true,
        });
        return createManyOpportunity;
      });

      const createManyResults = await Promise.all(createManyPromises);

      return res.status(201).json({count: createManyResults.length});
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  } else {
    try {
      const createOpportunity = await prisma.opportunity.create({
        data: {
          opportunityOwner: {
            connect: {
              id: Number(req.body.opportunityOwnerId),
            },
          },
          contact: Number(req.body.contactId)
            ? {
              connect: {
                id: Number(req.body.contactId),
              },
            }
            : undefined,
          company: Number(req.body.companyId)
            ? {
              connect: {
                id: Number(req.body.companyId),
              },
            }
            : undefined,
          opportunityName: req.body.opportunityName,
          amount: Number(req.body.amount) ? Number(req.body.amount) : undefined,
          opportunityType: Number(req.body.opportunityTypeId)
            ? {
              connect: {
                id: Number(req.body.opportunityTypeId),
              },
            }
            : undefined,
          opportunityStage: Number(req.body.opportunityStageId)
            ? {
              connect: {
                id: Number(req.body.opportunityStageId),
              },
            }
            : undefined,
          opportunitySource: Number(req.body.opportunitySourceId)
            ? {
              connect: {
                id: Number(req.body.opportunitySourceId),
              },
            }
            : undefined,
          opportunityCreateDate: new Date(req.body.opportunityCreateDate)
            ? new Date(req.body.opportunityCreateDate)
            : undefined,
          opportunityCloseDate: new Date(req.body.opportunityCloseDate)
            ? new Date(req.body.opportunityCloseDate)
            : undefined,
          nextStep: req.body.nextStep ? req.body.nextStep : undefined,
          competitors: req.body.competitors ? req.body.competitors : undefined,
          description: req.body.description ? req.body.description : undefined,
        },
      });
      return res.status(201).json(createOpportunity);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  }
};

//get all opportunity
const getAllOpportunity = async (req, res) => {
  if (req.query.query === "all") {
    try {
      const getAllOpportunity = await prisma.opportunity.findMany({
        orderBy: {
          id: "desc",
        },
        include: {
          opportunityOwner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          contact: {
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
          opportunityType: {
            select: {
              id: true,
              opportunityTypeName: true,
            },
          },
          opportunityStage: {
            select: {
              id: true,
              opportunityStageName: true,
            },
          },
          opportunitySource: {
            select: {
              id: true,
              opportunitySourceName: true,
            },
          },
        },
      });

      getAllOpportunity.map((opportunity) => {
        opportunity.opportunityOwner.fullName =
          opportunity.opportunityOwner.firstName +
          " " +
          opportunity.opportunityOwner.lastName;
        opportunity.contact.fullName =
          opportunity.contact.firstName + " " + opportunity.contact.lastName;
      });

      return res.status(200).json(getAllOpportunity);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  } else if (req.query.query === "search") {
    try {
      const {skip, limit} = getPagination(req.query);
      const getAllOpportunity = await prisma.opportunity.findMany({
        orderBy: {
          id: "desc",
        },
        where: {
          OR: [
            {
              opportunityName: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              amount: {
                in: Number(req.query.key) ? Number(req.query.key) : undefined,
              },
            },
            {
              competitors: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          opportunityOwner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          contact: {
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
          opportunityType: {
            select: {
              id: true,
              opportunityTypeName: true,
            },
          },
          opportunityStage: {
            select: {
              id: true,
              opportunityStageName: true,
            },
          },
          opportunitySource: {
            select: {
              id: true,
              opportunitySourceName: true,
            },
          },
        },

        skip: Number(skip),
        take: Number(limit),
      });

      const response = {
        getAllOpportunity: getAllOpportunity,
        totalOpportunityCount: {
          _count: {
            id: getAllOpportunity.length,
          },
        },
      };
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  } else if (req.query) {
    const boolenStatus = req.query.status?.split(",").map(JSON.parse);

    if (boolenStatus.length === 2) {
      try {
        const {skip, limit} = getPagination(req.query);
        const getAllOpportunity = await prisma.opportunity.findMany({
          orderBy: {
            id: "desc",
          },
          where: {
            opportunityOwnerId: {
              in: req.query.opportunityOwner?.split(",").map(Number)
                ? req.query.opportunityOwner?.split(",").map(Number)
                : undefined,
            },
            opportunityTypeId: {
              in: req.query.opportunityType?.split(",").map(Number)
                ? req.query.opportunityType?.split(",").map(Number)
                : undefined,
            },
            opportunityStageId: {
              in: req.query.opportunityStage?.split(",").map(Number)
                ? req.query.opportunityStage?.split(",").map(Number)
                : undefined,
            },
            opportunitySourceId: {
              in: req.query.opportunitySource?.split(",").map(Number)
                ? req.query.opportunitySource?.split(",").map(Number)
                : undefined,
            },
            companyId: {
              in: req.query.company?.split(",").map(Number)
                ? req.query.company?.split(",").map(Number)
                : undefined,
            },
            OR: [
              {status: {equals: boolenStatus[0]}},
              {status: {equals: boolenStatus[1]}},
            ],
          },
          include: {
            opportunityOwner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            contact: {
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
            opportunityType: {
              select: {
                id: true,
                opportunityTypeName: true,
              },
            },
            opportunityStage: {
              select: {
                id: true,
                opportunityStageName: true,
              },
            },
            opportunitySource: {
              select: {
                id: true,
                opportunitySourceName: true,
              },
            },
          },

          skip: Number(skip),
          take: Number(limit),
        });

        const totalOpportunityCount = await prisma.opportunity.aggregate({
          where: {
            opportunityOwnerId: {
              in: req.query.opportunityOwner?.split(",").map(Number)
                ? req.query.opportunityOwner?.split(",").map(Number)
                : undefined,
            },
            opportunityTypeId: {
              in: req.query.opportunityType?.split(",").map(Number)
                ? req.query.opportunityType?.split(",").map(Number)
                : undefined,
            },
            opportunityStageId: {
              in: req.query.opportunityStage?.split(",").map(Number)
                ? req.query.opportunityStage?.split(",").map(Number)
                : undefined,
            },
            opportunitySourceId: {
              in: req.query.opportunitySource?.split(",").map(Number)
                ? req.query.opportunitySource?.split(",").map(Number)
                : undefined,
            },
            companyId: {
              in: req.query.company?.split(",").map(Number)
                ? req.query.company?.split(",").map(Number)
                : undefined,
            },
            OR: [
              {status: {equals: boolenStatus[0]}},
              {status: {equals: boolenStatus[1]}},
            ],
          },
          _count: {
            id: true,
          },
        });

        return res.status(200).json({
          getAllOpportunity,
          totalOpportunityCount,
        });
      } catch (error) {
        return res.status(400).json({message: error.message});
      }
    } else if (boolenStatus.length === 1) {
      try {
        const {skip, limit} = getPagination(req.query);
        const getAllOpportunity = await prisma.opportunity.findMany({
          orderBy: {
            id: "desc",
          },
          where: {
            opportunityOwnerId: {
              in: req.query.opportunityOwner?.split(",").map(Number)
                ? req.query.opportunityOwner?.split(",").map(Number)
                : undefined,
            },
            opportunityTypeId: {
              in: req.query.opportunityType?.split(",").map(Number)
                ? req.query.opportunityType?.split(",").map(Number)
                : undefined,
            },
            opportunityStageId: {
              in: req.query.opportunityStage?.split(",").map(Number)
                ? req.query.opportunityStage?.split(",").map(Number)
                : undefined,
            },
            opportunitySourceId: {
              in: req.query.opportunitySource?.split(",").map(Number)
                ? req.query.opportunitySource?.split(",").map(Number)
                : undefined,
            },
            companyId: {
              in: req.query.company?.split(",").map(Number)
                ? req.query.company?.split(",").map(Number)
                : undefined,
            },
            status: {
              equals: req.query.status
                ? JSON.parse(req.query.status)
                : undefined,
            },
          },
          include: {
            opportunityOwner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            contact: {
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
            opportunityType: {
              select: {
                id: true,
                opportunityTypeName: true,
              },
            },
            opportunityStage: {
              select: {
                id: true,
                opportunityStageName: true,
              },
            },
            opportunitySource: {
              select: {
                id: true,
                opportunitySourceName: true,
              },
            },
          },

          skip: Number(skip),
          take: Number(limit),
        });

        const totalOpportunityCount = await prisma.opportunity.aggregate({
          where: {
            opportunityOwnerId: {
              in: req.query.opportunityOwner?.split(",").map(Number)
                ? req.query.opportunityOwner?.split(",").map(Number)
                : undefined,
            },
            opportunityTypeId: {
              in: req.query.opportunityType?.split(",").map(Number)
                ? req.query.opportunityType?.split(",").map(Number)
                : undefined,
            },
            opportunityStageId: {
              in: req.query.opportunityStage?.split(",").map(Number)
                ? req.query.opportunityStage?.split(",").map(Number)
                : undefined,
            },
            opportunitySourceId: {
              in: req.query.opportunitySource?.split(",").map(Number)
                ? req.query.opportunitySource?.split(",").map(Number)
                : undefined,
            },
            companyId: {
              in: req.query.company?.split(",").map(Number)
                ? req.query.company?.split(",").map(Number)
                : undefined,
            },
            status: JSON.parse(req.query.status),
          },
          _count: {
            id: true,
          },
        });

        return res.status(200).json({
          getAllOpportunity,
          totalOpportunityCount,
        });
      } catch (error) {
        return res.status(400).json({message: error.message});
      }
    }
  }
};

//get single opportunity
const getSingleOpportunity = async (req, res) => {
  try {
    const getSingleOpportunity = await prisma.opportunity.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        opportunityOwner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
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
        opportunityType: true,
        opportunityStage: true,
        opportunitySource: true,
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
        quote: {
          include: {
            quoteOwner: {
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

    //concat firstName and lastName
    if (getSingleOpportunity.opportunityOwner !== null)
      getSingleOpportunity.opportunityOwner.fullName =
        getSingleOpportunity.opportunityOwner.firstName +
        " " +
        getSingleOpportunity.opportunityOwner.lastName;

    if (getSingleOpportunity.contact !== null)
      getSingleOpportunity.contact.fullName =
        getSingleOpportunity.contact.firstName +
        " " +
        getSingleOpportunity.contact.lastName;

    if (getSingleOpportunity.company !== null)
      getSingleOpportunity.company.companyOwner.fullName =
        getSingleOpportunity.company.companyOwner.firstName +
        " " +
        getSingleOpportunity.company.companyOwner.lastName;

    if (getSingleOpportunity.contact !== null)
      getSingleOpportunity.contact.contactOwner.fullName =
        getSingleOpportunity.contact.contactOwner.firstName +
        " " +
        getSingleOpportunity.contact.contactOwner.lastName;

    getSingleOpportunity.crmEmail.map((email) => {
      email.emailOwner.fullName =
        email.emailOwner.firstName + " " + email.emailOwner.lastName;
    });

    getSingleOpportunity.quote.map((quote) => {
      quote.quoteOwner.fullName =
        quote.quoteOwner.firstName + " " + quote.quoteOwner.lastName;
    });

    getSingleOpportunity.attachment.map((attachment) => {
      attachment.attachmentOwner.fullName =
        attachment.attachmentOwner.firstName +
        " " +
        attachment.attachmentOwner.lastName;
    });

    getSingleOpportunity.note.map((note) => {
      note.noteOwner.fullName =
        note.noteOwner.firstName + " " + note.noteOwner.lastName;
    });
    return res.status(200).json(getSingleOpportunity);
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};

//update opportunity
const updateOpportunity = async (req, res) => {
  try {
    if (req.body.opportunityCreateDate && req.body.opportunityCloseDate) {
      req.body.opportunityCreateDate = new Date(req.body.opportunityCreateDate);
      req.body.opportunityCloseDate = new Date(req.body.opportunityCloseDate);
    } else if (req.body.opportunityCreateDate) {
      req.body.opportunityCreateDate = new Date(req.body.opportunityCreateDate);
    } else if (req.body.opportunityCloseDate) {
      req.body.opportunityCloseDate = new Date(req.body.opportunityCloseDate);
    }

    const updateOpportunity = await prisma.opportunity.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    return res.status(200).json(updateOpportunity);
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};

//delete opportunity
const deleteOpportunity = async (req, res) => {
  try {
    await prisma.opportunity.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        status: req.body.status,
      },
    });
    return res
      .status(200)
      .json({message: `Status has been updated to ${req.body.status}`});
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};

module.exports = {
  createOpportunity,
  getAllOpportunity,
  getSingleOpportunity,
  updateOpportunity,
  deleteOpportunity,
};
