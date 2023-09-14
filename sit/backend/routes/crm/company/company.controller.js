const {getPagination} = require("../../../utils/query");
const prisma = require("../../../utils/prisma");
const fs = require("fs");
const path = require("path");
const {get} = require("http");
//create company from company schema
const createCompany = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyCompany = await prisma.company.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deleteManyCompany);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  } else if (req.query.query === "createmany") {
    try {
      const createManyCompany = await prisma.company.createMany({
        data: req.body,
        skipDuplicates: true,
      });
      return res.status(201).json(createManyCompany);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  } else {
    try {
      const createCompany = await prisma.company.create({
        data: {
          companyOwner: {
            connect: {
              id: req.body.companyOwnerId,
            },
          },
          companyName: req.body.companyName,
          industry: {
            connect: {
              id: req.body.industryId,
            },
          },
          companyType: {
            connect: {
              id: req.body.companyTypeId,
            },
          },
          companySize: req.body.companySize,
          annualRevenue: req.body.annualRevenue,
          website: req.body.website,
          phone: req.body.phone,
          email: req.body.email,
          linkedin: req.body.linkedin,
          twitter: req.body.twitter,
          instagram: req.body.instagram,
          facebook: req.body.facebook,
          billingStreet: req.body.billingStreet,
          billingCity: req.body.billingCity,
          billingZipCode: req.body.billingZipCode,
          billingState: req.body.billingState,
          billingCountry: req.body.billingCountry,
          shippingStreet: req.body.shippingStreet,
          shippingCity: req.body.shippingCity,
          shippingZipCode: req.body.shippingZipCode,
          shippingState: req.body.shippingState,
          shippingCountry: req.body.shippingCountry,
        },
      });
      return res.status(201).json(createCompany);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  }
};

//get all company
const getAllCompany = async (req, res) => {
  if (req.query.query === "all") {
    try {
      const getAllCompany = await prisma.company.findMany({
        orderBy: {
          id: "desc",
        },
        include: {
          companyOwner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          industry: {
            select: {
              id: true,
              industryName: true,
            },
          },
          companyType: {
            select: {
              id: true,
              companyTypeName: true,
            },
          },
        },
      });

      //concat the first name and last name
      getAllCompany.map((company) => {
        company.companyOwner.fullName =
          company.companyOwner.firstName + " " + company.companyOwner.lastName;
      });

      return res.status(200).json(getAllCompany);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  } else if (req.query.query === "search") {
    try {
      const {skip, limit} = getPagination(req.query);
      const getAllCompany = await prisma.company.findMany({
        orderBy: {
          id: "desc",
        },
        where: {
          OR: [
            {
              companyName: {contains: req.query.key, mode: "insensitive"},
            },
            {
              companySize: {
                in: Number(req.query.key) ? Number(req.query.key) : undefined,
              },
            },
            {
              annualRevenue: {
                in: Number(req.query.key) ? Number(req.query.key) : undefined,
              },
            },
            {website: {contains: req.query.key, mode: "insensitive"}},
            {phone: {contains: req.query.key, mode: "insensitive"}},
            {email: {contains: req.query.key, mode: "insensitive"}},
            {linkedin: {contains: req.query.key, mode: "insensitive"}},
            {twitter: {contains: req.query.key, mode: "insensitive"}},
            {instagram: {contains: req.query.key, mode: "insensitive"}},
            {facebook: {contains: req.query.key, mode: "insensitive"}},
            {
              billingStreet: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              billingCity: {contains: req.query.key, mode: "insensitive"},
            },
            {
              billingZipCode: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              billingState: {contains: req.query.key, mode: "insensitive"},
            },
            {
              billingCountry: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              shippingStreet: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              shippingCity: {contains: req.query.key, mode: "insensitive"},
            },
            {
              shippingZipCode: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              shippingState: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
            {
              shippingCountry: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          companyOwner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          industry: {
            select: {
              id: true,
              industryName: true,
            },
          },
          companyType: {
            select: {
              id: true,
              companyTypeName: true,
            },
          },
        },
        skip: Number(skip),
        take: Number(limit),
      });

      //response should be obeject of array
      const response = {
        getAllCompany: getAllCompany,
        totalCompanyCount: {
          _count: {
            id: getAllCompany.length,
          },
        },
      };
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  } else if (req.query) {
    //get the boolean status
    const boolenStatus = req.query.status?.split(",").map(JSON.parse);

    //get all company with pagination
    if (boolenStatus.length === 2) {
      try {
        const {skip, limit} = getPagination(req.query);
        const getAllCompany = await prisma.company.findMany({
          orderBy: {
            id: "desc",
          },
          where: {
            companyOwnerId: {
              in: req.query.companyOwner?.split(",").map(Number)
                ? req.query.companyOwner?.split(",").map(Number)
                : undefined,
            },
            industryId: {
              in: req.query.industry?.split(",").map(Number)
                ? req.query.industry?.split(",").map(Number)
                : undefined,
            },
            companyTypeId: {
              in: req.query.companyType?.split(",").map(Number)
                ? req.query.companyType?.split(",").map(Number)
                : undefined,
            },

            OR: [
              {status: {equals: boolenStatus[0]}},
              {status: {equals: boolenStatus[1]}},
            ],
          },
          include: {
            companyOwner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            industry: {
              select: {
                id: true,
                industryName: true,
              },
            },
            companyType: {
              select: {
                id: true,
                companyTypeName: true,
              },
            },
          },
          skip: Number(skip),
          take: Number(limit),
        });

        const totalCompanyCount = await prisma.company.aggregate({
          where: {
            companyOwnerId: {
              in: req.query.companyOwner?.split(",").map(Number)
                ? req.query.companyOwner?.split(",").map(Number)
                : undefined,
            },
            industryId: {
              in: req.query.industry?.split(",").map(Number)
                ? req.query.industry?.split(",").map(Number)
                : undefined,
            },
            companyTypeId: {
              in: req.query.companyType?.split(",").map(Number)
                ? req.query.companyType?.split(",").map(Number)
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
          getAllCompany,
          totalCompanyCount,
        });
      } catch (error) {
        return res.status(400).json({message: error.message});
      }
    } else if (boolenStatus.length === 1) {
      try {
        const {skip, limit} = getPagination(req.query);
        const getAllCompany = await prisma.company.findMany({
          orderBy: {
            id: "desc",
          },
          where: {
            companyOwnerId: {
              in: req.query.companyOwner?.split(",").map(Number)
                ? req.query.companyOwner?.split(",").map(Number)
                : undefined,
            },
            industryId: {
              in: req.query.industry?.split(",").map(Number)
                ? req.query.industry?.split(",").map(Number)
                : undefined,
            },
            companyTypeId: {
              in: req.query.companyType?.split(",").map(Number)
                ? req.query.companyType?.split(",").map(Number)
                : undefined,
            },
            status: {
              equals: req.query.status
                ? JSON.parse(req.query.status)
                : undefined,
            },
          },
          include: {
            companyOwner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            industry: {
              select: {
                id: true,
                industryName: true,
              },
            },
            companyType: {
              select: {
                id: true,
                companyTypeName: true,
              },
            },
          },
          skip: Number(skip),
          take: Number(limit),
        });

        const totalCompanyCount = await prisma.company.aggregate({
          where: {
            companyOwnerId: {
              in: req.query.companyOwner?.split(",").map(Number)
                ? req.query.companyOwner?.split(",").map(Number)
                : undefined,
            },
            industryId: {
              in: req.query.industry?.split(",").map(Number)
                ? req.query.industry?.split(",").map(Number)
                : undefined,
            },
            companyTypeId: {
              in: req.query.companyType?.split(",").map(Number)
                ? req.query.companyType?.split(",").map(Number)
                : undefined,
            },
            status: JSON.parse(req.query.status),
          },
          _count: {
            id: true,
          },
        });

        return res.status(200).json({
          getAllCompany,
          totalCompanyCount,
        });
      } catch (error) {
        return res.status(400).json({message: error.message});
      }
    }
  }
};

//get single company
const getSingleCompany = async (req, res) => {
  try {
    const getSingleCompany = await prisma.company.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        companyOwner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        industry: true,
        companyType: true,
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
        opportunity: {
          include: {
            opportunityOwner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
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

    //concat the first name and last name
    if (getSingleCompany.companyOwner !== null)
      getSingleCompany.companyOwner.fullName =
        getSingleCompany.companyOwner.firstName +
        " " +
        getSingleCompany.companyOwner.lastName;

    if (getSingleCompany.contact !== null)
      getSingleCompany.contact.fullName =
        getSingleCompany.contact.firstName +
        " " +
        getSingleCompany.contact.lastName;

    getSingleCompany.opportunity.map((opportunity) => {
      opportunity.opportunityOwner.fullName =
        opportunity.opportunityOwner.firstName +
        " " +
        opportunity.opportunityOwner.lastName;
    });

    getSingleCompany.contact.map((contact) => {
      contact.contactOwner.fullName =
        contact.contactOwner.firstName + " " + contact.contactOwner.lastName;
    });

    getSingleCompany.note.map((note) => {
      note.noteOwner.fullName =
        note.noteOwner.firstName + " " + note.noteOwner.lastName;
    });

    getSingleCompany.attachment.map((attachment) => {
      attachment.attachmentOwner.fullName =
        attachment.attachmentOwner.firstName +
        " " +
        attachment.attachmentOwner.lastName;
    });

    getSingleCompany.crmEmail.map((crmEmail) => {
      crmEmail.emailOwner.fullName =
        crmEmail.emailOwner.firstName + " " + crmEmail.emailOwner.lastName;
    });

    getSingleCompany.quote.map((quote) => {
      quote.quoteOwner.fullName =
        quote.quoteOwner.firstName + " " + quote.quoteOwner.lastName;
    });

    return res.status(200).json(getSingleCompany);
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};

//update company
const updateCompany = async (req, res) => {
  try {
    const updateCompany = await prisma.company.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    return res.status(200).json(updateCompany);
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};

//delete company
const deleteCompany = async (req, res) => {
  try {
    const deleteCompany = await prisma.company.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        status: req.body.status,
      },
    });

    //get the image name from the deleteCompany response and delete the image from the ../../files/uploads
    const imageName = deleteCompany.image;
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
  createCompany,
  getAllCompany,
  getSingleCompany,
  updateCompany,
  deleteCompany,
};
