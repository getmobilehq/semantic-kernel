const rateLimit = require("express-rate-limit");
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

/* variables */
// express app instance
const app = express();

// holds all the allowed origins for cors access
let allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  "http://localhost:4000",

];

// limit the number of requests from a single IP address
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2000, // Limit each IP to 20 requests per `window` (here, per 15 minutes)
  standardHeaders: false, // Disable rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/* Middleware */
// for compressing the response body
app.use(compression());
// helmet: secure express app by setting various HTTP headers. And serve cross origin resources.
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// morgan: log requests to console in dev environment
app.use(morgan("dev"));
// allows cors access from allowedOrigins array
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// parse requests of content-type - application/json
app.use(express.json({ extended: true }));

/* Routes */
app.use(
  "/role-permission",
  require("./routes/hr/rolePermission/rolePermission.routes")
);
app.use(
  "/transaction",
  require("./routes/accounting/transaction/transaction.routes")
);
app.use("/permission", require("./routes/hr/permission/permission.routes"));
app.use("/user", limiter, require("./routes/user/user.routes"));
app.use("/role", require("./routes/hr/role/role.routes"));
app.use("/designation", require("./routes/hr/designation/designation.routes"));
app.use("/account", require("./routes/accounting/account/account.routes"));
app.use("/setting", require("./routes/setting/setting.routes"));
app.use("/email", require("./routes/email/email.routes"));
app.use("/email-config", require("./routes/emailConfig/emailConfig.routes"));
app.use("/department", require("./routes/hr/department/department.routes"));
app.use(
  "/employment-status",
  require("./routes/hr/employmentStatus/employmentStatus.routes")
);
app.use(
  "/announcement",
  require("./routes/hr/announcement/announcement.routes")
);
app.use("/education", require("./routes/hr/education/education.routes"));
app.use(
  "/salaryHistory",
  require("./routes/hr/salaryHistory/salaryHistory.routes")
);
app.use(
  "/designationHistory",
  require("./routes/hr/designationHistory/designationHistory.routes")
);
app.use("/dashboard", require("./routes/dashboard/dashboard.routes"));
app.use("/shift", require("./routes/hr/shift/shift.routes"));
app.use("/files", require("./routes/files/files.routes"));
app.use("/award", require("./routes/hr/award/award.routes"));
app.use(
  "/awardHistory",
  require("./routes/hr/awardHistory/awardHistory.routes")
);

/* CRM routes */

//contact routes
app.use("/contact", require("./routes/crm/contact/contact.routes"));
app.use(
  "/contact-source",
  require("./routes/crm/contactSource/contactSource.routes")
);
app.use(
  "/contact-stage",
  require("./routes/crm/contactStage/contactStage.routes")
);
app.use("/industry", require("./routes/crm/industry/industry.routes"));
app.use("/company", require("./routes/crm/company/company.routes"));
app.use(
  "/company-type",
  require("./routes/crm/companyType/companyType.routes")
);
app.use("/opportunity", require("./routes/crm/opportunity/opportunity.routes"));
app.use(
  "/opportunity-stage",
  require("./routes/crm/opportunityStage/opportunityStage.routes")
);
app.use(
  "/opportunity-type",
  require("./routes/crm/opportunityType/opportunityType.routes")
);
app.use(
  "/opportunity-source",
  require("./routes/crm/opportunitySource/opportunitySource.routes")
);
app.use("/product", require("./routes/crm/product/product.routes"));
app.use("/quote", require("./routes/crm/quote/quote.routes"));
app.use("/crm-task", require("./routes/crm/crmTask/crmTask.routes"));
app.use(
  "/crm-task-type",
  require("./routes/crm/crmTaskType/crmTaskType.routes")
);
app.use(
  "/crm-task-status",
  require("./routes/crm/crmTaskStatus/crmTaskStatus.routes")
);
app.use(
  "/crm-task-priority",
  require("./routes/crm/crmTaskPriority/crmTaskPriority.routes")
);
app.use("/quote-stage", require("./routes/crm/quoteStage/quoteStage.routes"));
app.use("/crm-email", require("./routes/crm/crmEmail/crmEmail.routes"));
app.use("/note", require("./routes/crm/note/note.routes"));
app.use("/attachment", require("./routes/crm/attachment/attachment.routes"));
app.use("/ticket", require("./routes/crm/ticket/ticket.routes"));
app.use(
  "/ticket-comment",
  require("./routes/crm/ticketComment/ticketComment.routes")
);
app.use("/customer", require("./routes/crm/customer/customer.routes"));
app.use(
  "/ticket-status",
  require("./routes/crm/ticketStatus/ticketStatus.routes")
);
app.use(
  "/ticket-category",
  require("./routes/crm/ticketCategory/ticketCategory.routes")
);
app.use(
  "/ticket-priority",
  require("./routes/crm/ticketPriority/ticketPriority.routes")
);
module.exports = app;
