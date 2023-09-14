const prisma = require("../../../utils/prisma");
const Email = require("../../../utils/email");

//create ticket-comment
const createTicketComment = async (req, res) => {
  try {
    if (req.auth.role === "customer") {
      const getTheCustomer = await prisma.customer.findUnique({
        where: {
          id: parseInt(req.auth.sub),
        },
      });
      const createTicketComment = await prisma.ticketComment.create({
        data: {
          ticket: {
            connect: {
              ticketId: parseInt(req.body.ticketId),
            },
          },
          repliedBy: getTheCustomer.firstName ? getTheCustomer.firstName:"customer",
          userType: req.auth.role,
          images: req.files
            ? {
              create: req.files.map((image) => ({
                imageName: image.filename,
              })),
            }
            : undefined,
          description: req.body.description,
        },
      });
      return res.status(201).json(createTicketComment);
    } else if (req.auth.role === "admin") {
      const getTheUser = await prisma.user.findUnique({
        where: {
          id: parseInt(req.auth.sub),
        },
      });
      const createTicketComment = await prisma.ticketComment.create({
        data: {
          ticket: {
            connect: {
              ticketId: parseInt(req.body.ticketId),
            },
          },
          repliedBy: getTheUser.userName ? getTheUser.userName : "admin",
          userType: req.auth.role,
          images: req.files
            ? {
              create: req.files.map((image) => ({
                imageName: image.filename,
              })),
            }
            : undefined,
          description: req.body.description,
        },
      });

      //before sending the response, send email to the customer

      //get the email config from database
      const emailConfig = await prisma.emailConfig.findFirst({
        where: {
          AND: {
            emailConfigName: req.params.emailConfigName,
          },
        },
      });

      if (!emailConfig.emailConfigName === req.params.emailConfigName) {
        return res.status(400).json({message: "Email config not found"});
      }

      const getTheTicket = await prisma.ticket.findUnique({
        where: {
          ticketId: parseInt(req.body.ticketId),
        },
      });

      const ticketCategory = await prisma.ticketCategory.findUnique({
        where: {
          id: getTheTicket.ticketCategoryId
        },
      });
      const ticketPriority = await prisma.ticketPriority.findUnique({
        where: {
          id: getTheTicket.ticketPriorityId
        },
      });

      const customer = await prisma.customer.findUnique({
        where: {
          id: getTheTicket.customerId
        },
      });

      const company = await prisma.appSetting.findUnique({
        where: {
          id: 1
        }
      });

      const subject = "[#Ticket-" + req.body.ticketId + "]" + ":[" + getTheTicket.subject + "] " + "Support Reply";
      const body =  `
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
    <p>Dear ${customer.firstName},</p>
    
    <p> We have replied to your ticket.</p>
    <div class="ticket-details">
      <h2>Ticket Replied:</h2>
      <p><strong>Admin Comment:</strong> [${req.body.description}]</p>
      <p style="color: gray;">Please log in to your account to view the reply.</p>
    </div>
    
    <div class="ticket-details">
      <h2>Ticket Details</h2>
      <p><strong>Ticket Number:</strong>#${req.body.ticketId}</p>
      <p><strong>Department:</strong>${ticketCategory.ticketCategoryName}</p>
      <p><strong>Priority:</strong style="color:green;">${ticketPriority.ticketPriorityName}</p>
    </div>
    
    <div class="contact-info">
      <p>Best regards,</p>
      <p>[${company.company_name}]<br>[${company.address}]<br>[${company.phone}]<br>[${company.website}]</p>
    </div>
    <p style="color:gray;">Note: This is a system-generated email. Please do not reply to this email.</p>
  </div>
</body>
</html>`;

      const mail = await Email.email(
        emailConfig,
        customer.email,
        subject,
        body
      );

      if (mail.error) {
        return res.status(400).json({error: mail.error});
      }
      return res.status(201).json(createTicketComment);
    }
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};

//get all ticket-comment
const getAllTicketComment = async (req, res) => {
  try {
    const getAllTicketComment = await prisma.ticketComment.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        images: {
          select: {
            id: true,
            imageName: true,
          },
        },
        ticket: true,
      },
    });
    return res.status(200).json(getAllTicketComment);
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};
//get all ticket-comment by ticketId
const getAllTicketCommentByTicketId = async (req, res) => {
  try {
    //get the ticket
    const getTheTicket = await prisma.ticketComment.findMany({
      where: {
        ticketId: parseInt(req.params.ticketId),
      },
      orderBy: {
        id: "desc",
      },
      include: {
        images: {
          select: {
            id: true,
            imageName: true,
          },
        },
      },
    });
    return res.status(200).json(getTheTicket);
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};

module.exports = {
  createTicketComment,
  getAllTicketComment,
  getAllTicketCommentByTicketId,
};
