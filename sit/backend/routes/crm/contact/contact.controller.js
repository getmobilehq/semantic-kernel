const {getPagination} = require("../../../utils/query");
const prisma = require("../../../utils/prisma");
const fs = require("fs");
const path = require("path");
const {get} = require("http");
//crete a new contact depend on contact schema
const createContact = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyContact = await prisma.contact.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deleteManyContact);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  } else if (req.query.query === "createmany") {
    try {
      const date = req.body.map((item) => {
        item.dateOfBirth = new Date(item.dateOfBirth);
        return item;
      });

      const createManyPromises = date.map(async (item) => {
        const createManyContact = await prisma.contact.createMany({
          data: item,
          skipDuplicates: true,
        });
        return createManyContact;
      });

      const createManyResults = await Promise.all(createManyPromises);
      return res.status(201).json({count: createManyResults.length});
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  } else {
    try {
      const createContact = await prisma.contact.create({
        data: {
          contactOwner: {
            connect: {
              id: Number(req.body.contactOwnerId),
            },
          },
          contactSource: {
            connect: {
              id: Number(req.body.contactSourceId),
            },
          },
          contactStage: {
            connect: {
              id: Number(req.body.contactStageId),
            },
          },
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          dateOfBirth: new Date(req.body.dateOfBirth)
            ? new Date(req.body.dateOfBirth)
            : undefined,
          company: {
            connect: Number(req.body.companyId)
              ? {
                id: Number(req.body.companyId),
              }
              : undefined,
          },
          jobTitle: req.body.jobTitle ? req.body.jobTitle : undefined,
          department: req.body.department ? req.body.department : undefined,
          industry: {
            connect: Number(req.body.industryId)
              ? {
                id: Number(req.body.industryId),
              }
              : undefined,
          },
          email: req.body.email,
          phone: req.body.phone,
          twitter: req.body.twitter ? req.body.twitter : undefined,
          linkedin: req.body.linkedin ? req.body.linkedin : undefined,
          presentAddress: req.body.presentAddress
            ? req.body.presentAddress
            : undefined,
          presentCity: req.body.presentCity ? req.body.presentCity : undefined,
          presentZipCode: req.body.presentZipCode
            ? req.body.presentZipCode
            : undefined,
          presentState: req.body.presentState
            ? req.body.presentState
            : undefined,
          presentCountry: req.body.presentCountry
            ? req.body.presentCountry
            : undefined,
          permanentAddress: req.body.permanentAddress
            ? req.body.permanentAddress
            : undefined,
          permanentCity: req.body.permanentCity
            ? req.body.permanentCity
            : undefined,
          permanentZipCode: req.body.permanentZipCode
            ? req.body.permanentZipCode
            : undefined,
          permanentState: req.body.permanentState
            ? req.body.permanentState
            : undefined,
          permanentCountry: req.body.permanentCountry
            ? req.body.permanentCountry
            : undefined,
          description: req.body.description ? req.body.description : undefined,
        },
      });
      return res.status(201).json(createContact);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  }
};

//get all contact
const getAllContact = async (req, res) => {
  if (req.query.query === "all") {
    try {
      const getAllContact = await prisma.contact.findMany({
        orderBy: {
          id: "desc",
        },
        include: {
          company: {
            select: {
              id: true,
              companyName: true,
            },
          },
          contactOwner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          contactSource: {
            select: {
              id: true,
              contactSourceName: true,
            },
          },
          contactStage: {
            select: {
              id: true,
              contactStageName: true,
            },
          },
          industry: {
            select: {
              id: true,
              industryName: true,
            },
          },
        },
      });

      //concat first name and last name
      getAllContact.map((contact) => {
        contact.fullName = contact.firstName + " " + contact.lastName;
        contact.contactOwner.fullName =
          contact.contactOwner.firstName + " " + contact.contactOwner.lastName;
      });

      return res.status(200).json(getAllContact);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  } else if (req.query.query === "search") {
    try {
      const {skip, limit} = getPagination(req.query);
      const getAllContact = await prisma.contact.findMany({
        orderBy: {
          id: "desc",
        },
        where: {
          OR: [
            {
              firstName: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              phone: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              twitter: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              linkedin: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              presentAddress: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              presentCity: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              presentZipCode: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              presentState: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              presentCountry: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              permanentAddress: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              permanentCity: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              permanentZipCode: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              permanentState: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              permanentCountry: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          company: {
            select: {
              id: true,
              companyName: true,
            },
          },
          contactOwner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          contactSource: {
            select: {
              id: true,
              contactSourceName: true,
            },
          },
          contactStage: {
            select: {
              id: true,
              contactStageName: true,
            },
          },
          industry: {
            select: {
              id: true,
              industryName: true,
            },
          },
        },

        skip: Number(skip),
        take: Number(limit),
      });

      const response = {
        getAllContact: getAllContact,
        totalContactCount: {
          _count: {
            id: getAllContact.length,
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
        const getAllContact = await prisma.contact.findMany({
          orderBy: {
            id: "desc",
          },
          where: {
            contactOwnerId: {
              in: req.query.contactOwner?.split(",").map(Number)
                ? req.query.contactOwner?.split(",").map(Number)
                : undefined,
            },
            contactSourceId: {
              in: req.query.contactSource?.split(",").map(Number)
                ? req.query.contactSource?.split(",").map(Number)
                : undefined,
            },
            contactStageId: {
              in: req.query.contactStage?.split(",").map(Number)
                ? req.query.contactStage?.split(",").map(Number)
                : undefined,
            },
            companyId: {
              in: req.query.company?.split(",").map(Number)
                ? req.query.company?.split(",").map(Number)
                : undefined,
            },
            industryId: {
              in: req.query.industry?.split(",").map(Number)
                ? req.query.industry?.split(",").map(Number)
                : undefined,
            },
            OR: [
              {status: {equals: boolenStatus[0]}},
              {status: {equals: boolenStatus[1]}},
            ],
          },
          include: {
            company: {
              select: {
                id: true,
                companyName: true,
              },
            },
            contactOwner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            contactSource: {
              select: {
                id: true,
                contactSourceName: true,
              },
            },
            contactStage: {
              select: {
                id: true,
                contactStageName: true,
              },
            },
            industry: {
              select: {
                id: true,
                industryName: true,
              },
            },
          },

          skip: Number(skip),
          take: Number(limit),
        });

        const totalContactCount = await prisma.contact.aggregate({
          where: {
            contactOwnerId: {
              in: req.query.contactOwner?.split(",").map(Number)
                ? req.query.contactOwner?.split(",").map(Number)
                : undefined,
            },
            contactSourceId: {
              in: req.query.contactSource?.split(",").map(Number)
                ? req.query.contactSource?.split(",").map(Number)
                : undefined,
            },
            contactStageId: {
              in: req.query.contactStage?.split(",").map(Number)
                ? req.query.contactStage?.split(",").map(Number)
                : undefined,
            },
            companyId: {
              in: req.query.company?.split(",").map(Number)
                ? req.query.company?.split(",").map(Number)
                : undefined,
            },
            industryId: {
              in: req.query.industry?.split(",").map(Number)
                ? req.query.industry?.split(",").map(Number)
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
          getAllContact,
          totalContactCount,
        });
      } catch (error) {
        return res.status(400).json({message: error.message});
      }
    } else if (boolenStatus.length === 1) {
      try {
        const {skip, limit} = getPagination(req.query);
        const getAllContact = await prisma.contact.findMany({
          orderBy: {
            id: "desc",
          },
          where: {
            contactOwnerId: {
              in: req.query.contactOwner?.split(",").map(Number)
                ? req.query.contactOwner?.split(",").map(Number)
                : undefined,
            },
            contactSourceId: {
              in: req.query.contactSource?.split(",").map(Number)
                ? req.query.contactSource?.split(",").map(Number)
                : undefined,
            },
            contactStageId: {
              in: req.query.contactStage?.split(",").map(Number)
                ? req.query.contactStage?.split(",").map(Number)
                : undefined,
            },
            companyId: {
              in: req.query.company?.split(",").map(Number)
                ? req.query.company?.split(",").map(Number)
                : undefined,
            },
            industryId: {
              in: req.query.industry?.split(",").map(Number)
                ? req.query.industry?.split(",").map(Number)
                : undefined,
            },
            status: {
              equals: req.query.status
                ? JSON.parse(req.query.status)
                : undefined,
            },
          },
          include: {
            company: {
              select: {
                id: true,
                companyName: true,
              },
            },
            contactOwner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            contactSource: {
              select: {
                id: true,
                contactSourceName: true,
              },
            },
            contactStage: {
              select: {
                id: true,
                contactStageName: true,
              },
            },
            industry: {
              select: {
                id: true,
                industryName: true,
              },
            },
          },

          skip: Number(skip),
          take: Number(limit),
        });

        const totalContactCount = await prisma.contact.aggregate({
          where: {
            contactOwnerId: {
              in: req.query.contactOwner?.split(",").map(Number)
                ? req.query.contactOwner?.split(",").map(Number)
                : undefined,
            },
            contactSourceId: {
              in: req.query.contactSource?.split(",").map(Number)
                ? req.query.contactSource?.split(",").map(Number)
                : undefined,
            },
            contactStageId: {
              in: req.query.contactStage?.split(",").map(Number)
                ? req.query.contactStage?.split(",").map(Number)
                : undefined,
            },
            companyId: {
              in: req.query.company?.split(",").map(Number)
                ? req.query.company?.split(",").map(Number)
                : undefined,
            },
            industryId: {
              in: req.query.industry?.split(",").map(Number)
                ? req.query.industry?.split(",").map(Number)
                : undefined,
            },
            status: JSON.parse(req.query.status),
          },
          _count: {
            id: true,
          },
        });

        return res.status(200).json({
          getAllContact,
          totalContactCount,
        });
      } catch (error) {
        return res.status(400).json({message: error.message});
      }
    }
  }
};

//get single contact
const getSingleContact = async (req, res) => {
  try {
    const getSingleContact = await prisma.contact.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
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
        contactOwner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        contactSource: true,
        contactStage: true,
        industry: true,
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
          },
        },
      },
    });

    //concat first name and last name
    if (getSingleContact !== null)
      getSingleContact.fullName =
        getSingleContact.firstName + " " + getSingleContact.lastName;

    if (getSingleContact.contactOwner !== null)
      getSingleContact.contactOwner.fullName =
        getSingleContact.contactOwner.firstName +
        " " +
        getSingleContact.contactOwner.lastName;

    getSingleContact.opportunity.map((opportunity) => {
      opportunity.opportunityOwner.fullName =
        opportunity.opportunityOwner.firstName +
        " " +
        opportunity.opportunityOwner.lastName;
    });

    if (getSingleContact.company !== null)
      getSingleContact.company.companyOwner.fullName =
        getSingleContact.company.companyOwner.firstName +
        " " +
        getSingleContact.company.companyOwner.lastName;

    getSingleContact.note.map((note) => {
      note.noteOwner.fullName =
        note.noteOwner.firstName + " " + note.noteOwner.lastName;
    });

    getSingleContact.attachment.map((attachment) => {
      attachment.attachmentOwner.fullName =
        attachment.attachmentOwner.firstName +
        " " +
        attachment.attachmentOwner.lastName;
    });

    getSingleContact.crmEmail.map((email) => {
      email.emailOwner.fullName =
        email.emailOwner.firstName + " " + email.emailOwner.lastName;
    });

    getSingleContact.quote.map((quote) => {
      quote.quoteOwner.fullName =
        quote.quoteOwner.firstName + " " + quote.quoteOwner.lastName;
    });

    return res.status(200).json(getSingleContact);
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};

//update contact
const updateContact = async (req, res) => {
  try {
    req.body.dateOfBirth = new Date(req.body.dateOfBirth)
      ? req.body.dateOfBirth
      : undefined;

    const updatedContact = await prisma.contact.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    return res.status(200).json(updatedContact);
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};

//delete contact
const deleteContact = async (req, res) => {
  try {
    const deleteContact = await prisma.contact.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        status: req.body.status,
      },
    });

    const imageName = deleteContact.image;
    const imagePath = path.join(__dirname, `../../files/uploads/${imageName}`);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err);

      }
    });

    return res
      .status(200)
      .json({message: `Status has been updated to ${req.body.status}`});
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};

module.exports = {
  createContact,
  getAllContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
