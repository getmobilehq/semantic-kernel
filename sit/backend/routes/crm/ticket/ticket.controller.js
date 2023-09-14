const {getPagination} = require("../../../utils/query");
const prisma = require("../../../utils/prisma");
const Email = require("../../../utils/email");

//create ticket
const createTicket = async (req, res) => {
  try {
    //auto generate ticket id
    let ticketId = Math.floor(100000 + Math.random() * 900000);

    const allTicketId = await prisma.ticket.findMany({
      where: {
        ticketId: parseInt(ticketId),
      },
    });
    if (allTicketId.length > 0) {
      ticketId = Math.floor(100000 + Math.random() * 900000);
    }

    //get the user
    const customer = await prisma.customer.findUnique({
      where: {
        id: parseInt(req.body.customerId),
      },
    });

    const createTicket = await prisma.ticket.create({
      data: {
        ticketId: parseInt(ticketId),
        customer: {
          connect: {
            id: parseInt(customer.id),
          },
        },
        email: req.body.email ? req.body.email : customer.email,
        subject: req.body.subject,
        description: req.body.description,
        images: req.files
          ? {
            create: req.files.map((image) => ({
              imageName: image.filename,
            })),
          }
          : undefined,
        ticketResolveTime: req.body.ticketResolveTime
          ? req.body.ticketResolveTime
          : undefined,
        ticketCategory: {
          connect: {
            id: parseInt(req.body.ticketCategoryId),
          },
        },
        ticketStatus: {
          connect: {
            id: 1,
          },
        },
        ticketPriority: {
          connect: {
            id: parseInt(req.body.priorityId),
          },
        },
      },
    });

    //create email after creating the ticket
    const emailConfig = await prisma.emailConfig.findFirst({
      where: {
        AND: {
          emailConfigName: req.params.emailConfigName,
        }
      }
    });

    if (!emailConfig.emailConfigName === req.params.emailConfigName) {
      return res.status(400).json({message: "Email config not found"});
    }

    const company = await prisma.appSetting.findUnique({
      where: {
        id: 1
      }
    });

    const emailBody = `
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
    }
    .ticket-details {
      background-color: #f5f5f5;
      padding: 10px;
      margin-top: 20px;
    }
    .ticket-details h2 {
      margin: 0;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
    .contact-info {
      margin-top: 20px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h1>Your Ticket [#${ticketId}] - [${req.body.subject}]</h1>
    
    <p>Dear ${customer.email.split('@')[0]},</p>
    
    <p>We hope this message finds you well. We would like to inform you that a new ticket has been successfully created for the issue you reported. Our team is dedicated to resolving this matter promptly and efficiently.</p>
    
    <div class="ticket-details">
      <h2>Ticket Details</h2>
      <p><strong>Ticket Number:</strong> #${ticketId}</p>
      <p><strong>Date Created:</strong> ${new Date()}</p>
      <p><strong>Issue Description:</strong> ${req.body.description}</p>
    </div>
    
    <p>Our support team is already at work on your case. You can expect updates from us as we make progress in resolving the issue. We understand the importance of a swift resolution and assure you that we are doing our utmost to address this matter.</p>
    
    <p>Thank you for choosing our services and allowing us the opportunity to assist you. We appreciate your patience as we work through this.</p>
    
    <div class="contact-info">
      <p>Best regards,</p>
      <p>${company.company_name}<br>${company.address}<br>${company.phone}<br>${company.website}</p>
    </div>
  </div>
</body>
</html>`

  const ticketEmail = await Email.email(
      emailConfig,
      req.body.email ? req.body.email : customer.email,
      `Your Ticket[#${ticketId}] has been created`,
      emailBody
    );

    if(ticketEmail.error){
      return res.status(400).json({error:ticketEmail.error})
    }

    return res.status(200).json(createTicket);
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: error.message});
  }
};

//get all ticket
const getAllTicket = async (req, res) => {
  if (req.query.query === "all") {
    try {
      const {skip, limit} = getPagination(req.query);
      const getAllTicket = await prisma.ticket.findMany({
        orderBy: {
          id: "desc",
        },
        include: {
          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          images: {
            select: {
              id: true,
              imageName: true,
            },
          },
          ticketCategory: true,
          ticketStatus: true,
          ticketPriority: true,
        },
        skip: Number(skip),
        take: Number(limit),
      });

      getAllTicket.map((item) => {
        item.customer.fullName =
          item.customer.firstName + " " + item.customer.lastName;
      });

      //get total ticket count
      const totalTicketCount = await prisma.ticket.aggregate({
        _count: {
          id: true,
        },
      });
      return res.status(200).json({getAllTicket, totalTicketCount});
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  } else if (req.query.query === "search") {
    //search ticket by ticket id
    try {
      if (req.query.key === undefined) {
        return res.status(400).json({message: "Please provide a ticket id"});
      }

      const getAllTicket = await prisma.ticket.findUnique({
        where: {
          ticketId: parseInt(req.query.key),
        },
        include: {
          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          images: {
            select: {
              id: true,
              imageName: true,
            },
          },
          ticketCategory: true,
          ticketStatus: true,
          ticketPriority: true,
        },
      });

      if (getAllTicket) {
        getAllTicket.customer.fullName =
          getAllTicket.customer.firstName +
          " " +
          getAllTicket.customer.lastName;
      }

      return res.status(200).json(getAllTicket);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  } else if (req.query) {
    //search ticket by ticket status

    if (req.query.ticketStatus === undefined) {
      return res
        .status(400)
        .json({message: "Please provide a ticket status"});
    }

    try {
      if (req.query.ticketStatus) {
        const {skip, limit} = getPagination(req.query);
        const getAllTicket = await prisma.ticket.findMany({
          orderBy: {
            id: "desc",
          },
          where: {
            ticketStatusId: {
              in: req.query.ticketStatus?.split(",").map(Number)
                ? req.query.ticketStatus?.split(",").map(Number)
                : undefined,
            },
          },
          include: {
            customer: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            images: {
              select: {
                id: true,
                imageName: true,
              },
            },
            ticketCategory: true,
            ticketStatus: true,
            ticketPriority: true,
          },
          skip: Number(skip),
          take: Number(limit),
        });

        //get total ticket count
        const totalTicketCount = await prisma.ticket.aggregate({
          _count: {
            id: true,
          },
        });

        getAllTicket.map((item) => {
          item.customer.fullName =
            item.customer.firstName + " " + item.customer.lastName;
        });
        return res.status(200).json({getAllTicket, totalTicketCount});
      }
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  }
};

//get single ticket
const getSingleTicket = async (req, res) => {
  try {
    const getSingleTicket = await prisma.ticket.findUnique({
      where: {
        ticketId: parseInt(req.params.id),
      },
      include: {
        images: {
          select: {
            id: true,
            imageName: true,
          },
        },
        ticketComment: {
          include: {
            images: {
              select: {
                id: true,
                imageName: true,
              },
            },
          },
        },
        ticketCategory: true,
        ticketStatus: true,
        ticketPriority: true,
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    getSingleTicket.customer.fullName =
      getSingleTicket.customer.firstName +
      " " +
      getSingleTicket.customer.lastName;
    return res.status(200).json(getSingleTicket);
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};

//getall ticket by customer id
const getAllTicketByCustomerId = async (req, res) => {
  if (req.auth.sub !== parseInt(req.params.id)) {
    return res.status(401).json({message: "Unauthorized"});
  }

  if (req.query.query === "all") {
    try {
      const {skip, limit} = getPagination(req.query);
      const getAllTicketByCustomerId = await prisma.ticket.findMany({
        where: {
          customerId: parseInt(req.params.id),
        },
        orderBy: {
          id: "desc",
        },
        include: {
          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          images: {
            select: {
              id: true,
              imageName: true,
            },
          },
          ticketCategory: true,
          ticketStatus: true,
          ticketPriority: true,
        },
        skip: Number(skip),
        take: Number(limit),
      });

      getAllTicketByCustomerId.map((item) => {
        item.customer.fullName =
          item.customer.firstName + " " + item.customer.lastName;
      });

      //get total ticket count
      const totalTicketCount = await prisma.ticket.aggregate({
        where: {
          customerId: parseInt(req.params.id),
        },
        _count: {
          id: true,
        },
      });

      return res
        .status(200)
        .json({getAllTicket: getAllTicketByCustomerId, totalTicketCount});
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
  } else if (req.query.query === "search") {
    try {
      const getAllTicket = await prisma.ticket.findMany({
        where: {
          customerId: parseInt(req.params.id),
          ticketId: parseInt(req.query.key),
        },
        orderBy: {
          id: "desc",
        },
        include: {
          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          images: {
            select: {
              id: true,
              imageName: true,
            },
          },
          ticketCategory: true,
          ticketStatus: true,
          ticketPriority: true,
        },
      });

      getAllTicket.map((item) => {
        item.customer.fullName =
          item.customer.firstName + " " + item.customer.lastName;
      });

      return res.status(200).json(getAllTicket);
    } catch (error) {
      return res.status(400).json({message: error.message});
    }

    return res.status(200).json(getAllTicket);
  } else if (req.query.ticketStatus) {
    const {skip, limit} = getPagination(req.query);
    const getAllTicket = await prisma.ticket.findMany({
      orderBy: {
        id: "desc",
      },
      where: {
        customerId: parseInt(req.params.id),
        ticketStatusId: {
          in: req.query.ticketStatus?.split(",").map(Number)
            ? req.query.ticketStatus?.split(",").map(Number)
            : undefined,
        },
      },
      include: {
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        images: {
          select: {
            id: true,
            imageName: true,
          },
        },
        ticketCategory: true,
        ticketStatus: true,
        ticketPriority: true,
      },
      skip: Number(skip),
      take: Number(limit),
    });

    //get total ticket count
    const totalTicketCount = await prisma.ticket.aggregate({
      where: {
        customerId: parseInt(req.params.id),
      },
      _count: {
        id: true,
      },
    });

    getAllTicket.map((item) => {
      item.customer.fullName =
        item.customer.firstName + " " + item.customer.lastName;
    });
    return res.status(200).json({getAllTicket, totalTicketCount});
  }
};

//update ticket
const updateTicket = async (req, res) => {
  try {
    if (req.body.ticketStatusId === 4) {
      //get the ticket created_at time
      const getTicket = await prisma.ticket.findUnique({
        where: {
          ticketId: parseInt(req.params.id),
        },
      });
      const ticketNewDate = new Date();

      //get the time difference
      const timeDiff = Math.abs(
        ticketNewDate.getTime() - getTicket.createdAt.getTime()
      );

      const diffMinutes = Math.ceil(timeDiff / (1000 * 60));

      //update the ticket
      const updateTicket = await prisma.ticket.update({
        where: {
          ticketId: parseInt(req.params.id),
        },
        data: {
          ticketStatus: {
            connect: {
              id: parseInt(req.body.ticketStatusId),
            },
          },
          ticketResolveTime: diffMinutes.toString(),
        },
      });


      //send email after resolving the ticket
      //create email after creating the ticket
      const emailConfig = await prisma.emailConfig.findFirst({
        where: {
          AND: {
            emailConfigName: req.params.emailConfigName,
          }
        }
      });

      if (!emailConfig.emailConfigName === req.params.emailConfigName) {
        return res.status(400).json({message: "Email config not found"});
      }

      const company = await prisma.appSetting.findUnique({
        where: {
          id: 1
        }
      });

      //customer
      const customer = await prisma.customer.findUnique({
        where: {
          id: getTicket.customerId
        }
      });

      //ticket category
      const ticketCategory = await prisma.ticketCategory.findUnique({
        where: {
          id: getTicket.ticketCategoryId
        }
      });

      //ticket priority
      const ticketPriority = await prisma.ticketPriority.findUnique({
        where: {
          id: getTicket.ticketPriorityId
        }
      });

      const emailBody = `
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    .priority{
      color: green;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
    }
    .ticket-details {
      background-color: #f5f5f5;
      padding: 10px;
      margin-top: 20px;
    }
    .ticket-details h2 {
      margin: 0;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
    .contact-info {
      margin-top: 20px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h1>Resolution of Ticket [#${req.params.id}] - [${getTicket.subject}]</h1>
    
    <p>Dear ${customer.email.split('@')[0]},</p>
    
    <p>We are pleased to inform you that the issue you reported through ticket [#${req.params.id}] has been successfully resolved.</p>
    
    <div class="ticket-details">
      <h2>Ticket Details</h2>
      <p><strong>Ticket Number:</strong> #${req.params.id}</p>
      <p><strong>Resolve Date:</strong> ${new Date()}</p>
      <p><strong>Department:</strong>${ticketCategory.ticketCategoryName}</p>
      <p><strong>Priority:</strong id="priority">${ticketPriority.ticketPriorityName}</p>
    </div>
    
   <p>Our support team has worked diligently to address the matter, and we are glad to confirm that the issue has been resolved to your satisfaction.</p>
    
    <p>If you have any further questions or require additional assistance, please don't hesitate to reach out to us. Your feedback is important to us as we continually strive to improve our services.</p>
    
    <p>Thank you for your patience and cooperation throughout the resolution process. We value your business and look forward to serving you again in the future.</p>
    
    <div class="contact-info">
      <p>Best regards,</p>
      <p>${company.company_name}<br>${company.address}<br>${company.phone}<br>${company.website}</p>
    </div>
  </div>
</body>
</html>`

      await Email.email(
        emailConfig,
        req.body.email ? req.body.email : customer.email,
        `Your Ticket[#${req.params.id}] has been Solved`,
        emailBody
      );

      return res.status(200).json(updateTicket);
    }

    const updateTicket = await prisma.ticket.update({
      where: {
        ticketId: parseInt(req.params.id),
      },
      data: req.body,
    });
    return res.status(200).json(updateTicket);
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};

//delete ticket
const deleteTicket = async (req, res) => {
  try {
    const deleteTicket = await prisma.ticket.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    return res.status(200).json(deleteTicket);
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};

module.exports = {
  createTicket,
  getAllTicket,
  getSingleTicket,
  getAllTicketByCustomerId,
  updateTicket,
  deleteTicket,
};
