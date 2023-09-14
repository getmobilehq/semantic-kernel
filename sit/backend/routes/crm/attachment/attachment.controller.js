const prisma = require("../../../utils/prisma");
const { getPagination } = require("../../../utils/query");
//create a new attachment
const createAttachment = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyAttachment = await prisma.attachment.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deleteManyAttachment);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const fileName = req.files[0].originalname;
      const extension = fileName.split(".").pop();
      const truncatedFileName = fileName.substr(0, 30) + "." + extension;

      const createAttachment = await prisma.attachment.create({
        data: {
          attachmentOwner: {
            connect: {
              id: parseInt(req.body.attachmentOwnerId),
            },
          },
          attachmentName: truncatedFileName,
          attachmentPath: req.files[0].filename,
          company: req.body.companyId
            ? {
                connect: {
                  id: parseInt(req.body.companyId),
                },
              }
            : undefined,
          contact: req.body.contactId
            ? {
                connect: {
                  id: parseInt(req.body.contactId),
                },
              }
            : undefined,
          opportunity: req.body.opportunityId
            ? {
                connect: {
                  id: parseInt(req.body.opportunityId),
                },
              }
            : undefined,
          quote: req.body.quoteId
            ? {
                connect: {
                  id: parseInt(req.body.quoteId),
                },
              }
            : undefined,
        },
      });
      return res.status(201).json(createAttachment);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

//get all attachments
const getAllAttachments = async (req, res) => {
  if (req.query.query === "all") {
    try {
      const getAllAttachment = await prisma.attachment.findMany({
        orderBy: {
          id: "desc",
        },
        include: {
          attachmentOwner: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          company: true,
          contact: true,
          opportunity: true,
          quote: true,
        },
      });

      getAllAttachment.map((attachment) => {
        attachment.attachmentOwner.fullName =
          attachment.attachmentOwner.firstName +
          " " +
          attachment.attachmentOwner.lastName;
      });

      return res.status(200).json(getAllAttachment);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query.query === "search") {
    try {
      const { skip, limit } = getPagination(req.query);
      const getAllAttachment = await prisma.attachment.findMany({
        orderBy: {
          id: "desc",
        },
        where: {
          OR: [
            {
              attachmentName: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          attachmentOwner: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          company: true,
          contact: true,
          opportunity: true,
          quote: true,
        },
        skip: Number(skip),
        take: Number(limit),
      });

      getAllAttachment.map((attachment) => {
        attachment.attachmentOwner.fullName =
          attachment.attachmentOwner.firstName +
          " " +
          attachment.attachmentOwner.lastName;
      });

      const totalAttachmentCount = {
        _count: {
          id: getAllAttachment.length,
        },
      };
      return res.status(200).json({ getAllAttachment, totalAttachmentCount });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query) {
    const boolenStatus = req.query.status?.split(",").map(JSON.parse);

    if (boolenStatus.length === 2) {
      try {
        const { skip, limit } = getPagination(req.query);
        const getAllAttachment = await prisma.attachment.findMany({
          orderBy: {
            id: "desc",
          },
          where: {
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
            opportunityId: {
              in: req.query.opportunity?.split(",").map(Number)
                ? req.query.opportunity?.split(",").map(Number)
                : undefined,
            },
            quoteId: {
              in: req.query.quote?.split(",").map(Number)
                ? req.query.quote?.split(",").map(Number)
                : undefined,
            },
            OR: [
              { status: { equals: boolenStatus[0] } },
              { status: { equals: boolenStatus[1] } },
            ],
          },
          include: {
            attachmentOwner: {
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
            contact: {
              select: {
                contactOwner: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
            opportunity: {
              select: {
                id: true,
                opportunityName: true,
              },
            },
            quote: {
              select: {
                id: true,
                quoteName: true,
              },
            },
          },
          skip: Number(skip),
          take: Number(limit),
        });

        const totalAttachmentCount = await prisma.attachment.aggregate({
          where: {
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
            opportunityId: {
              in: req.query.opportunity?.split(",").map(Number)
                ? req.query.opportunity?.split(",").map(Number)
                : undefined,
            },
            quoteId: {
              in: req.query.quote?.split(",").map(Number)
                ? req.query.quote?.split(",").map(Number)
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

        getAllAttachment.map((attachment) => {
          attachment.attachmentOwner.fullName =
            attachment.attachmentOwner?.firstName +
            " " +
            attachment.attachmentOwner.lastName;
        });

        return res.status(200).json({
          getAllAttachment,
          totalAttachmentCount,
        });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    } else if (boolenStatus.length === 1) {
      try {
        const { skip, limit } = getPagination(req.query);
        const getAllAttachment = await prisma.attachment.findMany({
          orderBy: {
            id: "desc",
          },
          where: {
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
            opportunityId: {
              in: req.query.opportunity?.split(",").map(Number)
                ? req.query.opportunity?.split(",").map(Number)
                : undefined,
            },
            quoteId: {
              in: req.query.quote?.split(",").map(Number)
                ? req.query.quote?.split(",").map(Number)
                : undefined,
            },
            OR: [
              { status: { equals: boolenStatus[0] } },
              { status: { equals: boolenStatus[1] } },
            ],
          },
          include: {
            attachmentOwner: {
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
            contact: {
              select: {
                contactOwner: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
            opportunity: {
              select: {
                id: true,
                opportunityName: true,
              },
            },
            quote: {
              select: {
                id: true,
                quoteName: true,
              },
            },
          },
          skip: Number(skip),
          take: Number(limit),
        });
        const totalAttachmentCount = await prisma.attachment.aggregate({
          where: {
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
            opportunityId: {
              in: req.query.opportunity?.split(",").map(Number)
                ? req.query.opportunity?.split(",").map(Number)
                : undefined,
            },
            quoteId: {
              in: req.query.quote?.split(",").map(Number)
                ? req.query.quote?.split(",").map(Number)
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

        getAllAttachment.map((attachment) => {
          attachment.attachmentOwner.fullName =
            attachment.attachmentOwner.firstName +
            " " +
            attachment.attachmentOwner.lastName;
        });

        return res.status(200).json({
          getAllAttachment,
          totalAttachmentCount,
        });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }
};

//get a single attachment
const getSingleAttachment = async (req, res) => {
  try {
    const getSingleAttachment = await prisma.attachment.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        attachmentOwner: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        company: true,
        contact: true,
        opportunity: true,
        quote: true,
      },
    });

    getSingleAttachment.attachmentOwner.fullName =
      getSingleAttachment.attachmentOwner.firstName +
      " " +
      getSingleAttachment.attachmentOwner.lastName;

    return res.status(200).json(getSingleAttachment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//delete a attachment
const deleteAttachment = async (req, res) => {
  try {
    const deleteAttachment = await prisma.attachment.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (deleteAttachment)
      return res
        .status(200)
        .json({ message: "Attachment deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createAttachment,
  getAllAttachments,
  getSingleAttachment,
  deleteAttachment,
};
