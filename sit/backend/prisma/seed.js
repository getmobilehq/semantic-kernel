const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const fs = require("fs");
const path = require("path");

const folderName = "uploads";
const folderPath = path.join(__dirname, "../routes/files", folderName);
// Check if the folder already exists
!fs.existsSync(folderPath)
  ? // Create the folder
    fs.mkdirSync(folderPath)
  : console.log(`Folder "${folderPath}" already exists.`);

const endpoints = [
  "rolePermission",
  "transaction",
  "permission",
  "dashboard",
  "user",
  "role",
  "designation",
  "account",
  "setting",
  "email",
  "department",
  "education",
  "employmentStatus",
  "announcement",
  "salaryHistory",
  "designationHistory",
  "award",
  "shift",
  "awardHistory",
  "file",
  "contact",
  "company",
  "opportunity",
  "quote",
  "crmTask",
  "emailConfig",
  "product",
  "note",
  "attachment",
  "ticket",
  "customer",
  "ticketComment",
  "ticketCategory",
  "ticketPriority",
  "ticketStatus",
  "companyType",
  "contactSource",
  "contactStage",
  "crmTaskPriority",
  "crmTaskStatus",
  "crmTaskType",
  "industry",
  "opportunitySource",
  "opportunityStage",
  "opportunityType",
  "quoteStage",
];

const permissionTypes = ["create", "readAll", "readSingle", "update", "delete"];

// create permissions for each endpoint by combining permission type and endpoint name
const permissions = endpoints.reduce((acc, cur) => {
  const permission = permissionTypes.map((type) => {
    return `${type}-${cur}`;
  });
  return [...acc, ...permission];
}, []);

const roles = ["admin", "staff", "customer"];

const account = [
  { name: "Asset", type: "Asset" },
  { name: "Liability", type: "Liability" },
  { name: "Capital", type: "Owner's Equity" },
  { name: "Withdrawal", type: "Owner's Equity" },
  { name: "Revenue", type: "Owner's Equity" },
  { name: "Expense", type: "Owner's Equity" },
];

const subAccount = [
  { account_id: 1, name: "Cash" }, //1
  { account_id: 1, name: "Bank" }, //2
  { account_id: 1, name: "Inventory" }, //3
  { account_id: 1, name: "Accounts Receivable" }, //4
  { account_id: 2, name: "Accounts Payable" }, //5
  { account_id: 3, name: "Capital" }, //6
  { account_id: 4, name: "Withdrawal" }, //7
  { account_id: 5, name: "Sales" }, //8
  { account_id: 6, name: "Cost of Sales" }, //9
  { account_id: 6, name: "Salary" }, //10
  { account_id: 6, name: "Rent" }, //11
  { account_id: 6, name: "Utilities" }, //12
  { account_id: 5, name: "Discount Earned" }, //13
  { account_id: 6, name: "Discount Given" }, //14
];

const settings = {
  company_name: "My Company",
  address: "My Address",
  phone: "My Phone",
  email: "My Email",
  website: "My Website",
  footer: "My Footer",
  tag_line: "My Tag Line",
};

const department = [
  { name: "IT" },
  { name: "HR" },
  { name: "Sales" },
  { name: "Marketing" },
  { name: "Finance" },
  { name: "Operations" },
  { name: "Customer Support" },
];

const designation = [
  { name: "CEO" },
  { name: "CTO" },
  { name: "CFO" },
  { name: "COO" },
  { name: "HR Manager" },
];

const employmentStatus = [
  { name: "Intern", colourValue: "#00FF00", description: "Intern" },
  { name: "Permenent", colourValue: "#FF0000", description: "Permenent" },
  { name: "Staff", colourValue: "#FFFF00", description: "Staff" },
  { name: "Terminated", colourValue: "#00FFFF", description: "Terminated" },
];

const shifts = [
  {
    name: "Morning",
    startTime: "1970-01-01T08:00:00.000Z",
    endTime: "1970-01-01T16:00:00.000Z",
    workHour: 8,
  },
  {
    name: "Evening",
    startTime: "1970-01-01T16:00:00.000Z",
    endTime: "1970-01-01T00:00:00.000Z",
    workHour: 8,
  },
  {
    name: "Night",
    startTime: "1970-01-01T00:00:00.000Z",
    endTime: "1970-01-01T08:00:00.000Z",
    workHour: 8,
  },
];

const award = [
  {
    name: "Employee of the Month",
    description: "Employee who has performed well in the month",
  },
  {
    name: "Employee of the Year",
    description: "Employee who has performed well in the year",
  },
];

const contactSource = [
  {
    contactSourceName: "Website",
  },
  {
    contactSourceName: "social media",
  },
  {
    contactSourceName: "Email Campaign",
  },
  {
    contactSourceName: "Events",
  },
  {
    contactSourceName: "Webinars",
  },
  {
    contactSourceName: "Referrals",
  },
  {
    contactSourceName: "Cold Calling",
  },
  {
    contactSourceName: "Paid Advertising",
  },
  {
    contactSourceName: "Organic Search",
  },
  {
    contactSourceName: "Content Marketing",
  },
  {
    contactSourceName: "Partner Programs",
  },
  {
    contactSourceName: "Direct Mail",
  },
  {
    contactSourceName: "Third-Party Lists",
  },
  {
    contactSourceName: "Offline Networking",
  },
];

const industry = [
  "Agriculture",
  "Automotive",
  "Banking and Finance",
  "Biotechnology",
  "Chemicals",
  "Construction",
  "Consumer Goods",
  "E-commerce",
  "Education",
  "Energy and Utilities",
  "Engineering",
  "Entertainment",
  "Environment and Sustainability",
  "Food and Beverage",
  "Government and Public Sector",
  "Healthcare and Pharmaceuticals",
  "Hospitality and Tourism",
  "Information Technology and Services",
  "Insurance",
  "Legal",
  "Manufacturing",
  "Marketing and Advertising",
  "Media and Communications",
  "Mining and Metals",
  "Nonprofit and Social Services",
  "Oil and Gas",
  "Professional Services",
  "Real Estate",
  "Retail",
  "Sports and Recreation",
  "Telecommunications",
  "Transportation and Logistics",
  "Wholesale Trade",
  "Others",
];

const contactStage = [
  "Prospect",
  "Lead",
  "Marketing Qualified Lead (MQL)",
  "Sales Qualified Lead (SQL)",
  "Opportunity",
  "Customer",
  "Repeat Customer",
  "Evangelist",
];

const companyType = ["Private", "Public", "Government", "NGO", "Others"];

const opportunityStage = [
  "Prospect",
  "Qualification",
  "Needs Assessment",
  "Proposal/Quote",
  "Negotiation/Review",
  "Closed Won",
  "Closed Lost",
];

const OpportunityType = [
  "New Business",
  "Existing Customer - upgraded",
  "Existing Customer - Renewal",
];

const opportunitySource = [
  "Website",
  "social media",
  "Email Campaign",
  "Events",
  "Webinars",
  "Referrals",
  "Cold Calling",
  "Paid Advertising",
  "Organic Search",
  "Content Marketing",
  "Partner Programs",
  "Direct Mail",
  "Third-Party Lists",
  "Offline Networking",
];

const quoteStage = ["Draft", "Sent", "Accepted", "Rejected"];

const crmTaskType = ["Call", "Email", "Event", "Todo"];
const crmTaskStatus = ["todo", "in-progress", "done"];
const crmTaskPriority = ["low", "medium", "high"];
const ticketStatus = ["pending", "in-progress", "need information", "resolved"];
const ticketCategory = [
  "Billing",
  "Assistance",
  "Technical",
  "Sales",
  "Others",
];
const ticketPriority = ["low", "medium", "high"];

//company
const company = [
  {
    companyOwnerId: 1,
    companyName: "abc",
    industryId: 2,
    companyTypeId: 1,
    companySize: 10,
    annualRevenue: 10000,
    website: "xyz.net",
    phone: "4810165150",
    email: "pqw@gmail.com",
    linkedin: "linkdi",
    twitter: "twitr",
    instagram: "instagram",
    facebook: "facebook",
    billingStreet: "billingStreet",
    billingCity: "billingCity",
    billingZipCode: "billingZipCode",
    billingState: "billingState",
    billingCountry: "billingCountry",
    shippingStreet: "shippingStreet",
    shippingCity: "uttara",
    shippingZipCode: "1230",
    shippingState: "dhaka",
    shippingCountry: "bangladesh",
  },
];
//contact
const contact = [
  {
    contactOwnerId: 1,
    contactSourceId: 1,
    contactStageId: 1,
    firstName: "rakibul",
    lastName: "shaon",
    dateOfBirth: new Date("2023-04-24T14:21:00"),
    companyId: 1,
    jobTitle: "dev",
    department: "IT",
    industryId: 2,
    email: "shaon@gmail.com",
    phone: "01820361645",
    twitter: "tbt",
    linkedin: "dfvdf",
    presentAddress: "vdfbdf",
    presentCity: "dhaka",
    presentZipCode: "1200",
    presentState: "mirpur",
    presentCountry: "Bangladesh",
    permanentAddress: "vdfbdf",
    permanentCity: "dhaka",
    permanentZipCode: "1200",
    permanentState: "mirpur",
    permanentCountry: "Bangladesh",
    description: "tcgu",
  },
];

//opportunity
const opportunity = [
  {
    opportunityOwnerId: 1,
    contactId: 1,
    companyId: 1,
    opportunityName: "test",
    amount: 100000,
    opportunityTypeId: 1,
    opportunityStageId: 1,
    opportunitySourceId: 3,
    opportunityCreateDate: new Date("2023-04-24T14:21:00"),
    opportunityCloseDate: new Date("2023-05-24T14:21:00"),
    nextStep: "test",
    competitors: "shaon",
    description: "byubb",
  },
];

//product
const product = [
  {
    productName: "POS 2",
  },
  {
    productName: "POS 3",
  },
];

//quote
const quote = [
  {
    quoteOwnerId: 1,
    quoteName: "hello",
    quoteDate: new Date("2023-04-24T14:21:00"),
    opportunityId: 1,
    companyId: 1,
    contactId: 1,
    expirationDate: new Date("2023-06-24T14:21:00"),
    quoteStageId: 2,
    termsAndConditions: "test",
    description: "test",
    discount: 20,
  },
];

const quoteProduct = [
  {
    quoteId: 1,
    productId: 1,
    productQuantity: 1,
    unitPrice: 150,
  },
  {
    quoteId: 1,
    productId: 2,
    productQuantity: 1,
    unitPrice: 50,
  },
];

//email config
const emailConfig = [
  {
    emailConfigName: "my smtp",
    emailHost: "mail.omega.ac",
    emailPort: 465,
    emailUser: "no-reply@omega.ac",
    emailPass: "@omega@2020",
  },
];

const customer = [
  {
    roleId: 3,
    image: "vnnre.png",
    firstName: "rakibul",
    lastName: "hasan",
    phone: "01820361645",
    email: "dev@omega.ac",
    password: bcrypt.hashSync("1234", 10),
    dateOfBirth: new Date("2023-04-24T14:21:00"),
    jobTitle: "Engineer",
    socialMediaUrl: "facebook.com",
    address: "mirpur",
    city: "dhaka",
    state: "Bangladesh",
    zip: "1216",
    country: "Bangladesh",
  },
];

const rolePermission = [
  {
    role_id: 3,
    permission_id: 146,
  },
  ,
  {
    role_id: 3,
    permission_id: 147,
  },
  {
    role_id: 3,
    permission_id: 148,
  },
  {
    role_id: 3,
    permission_id: 153,
  },
  {
    role_id: 3,
    permission_id: 154,
  },
  {
    role_id: 3,
    permission_id: 155,
  },
  {
    role_id: 3,
    permission_id: 156,
  },
  {
    role_id: 3,
    permission_id: 157,
  },
  ,
  {
    role_id: 3,
    permission_id: 158,
  },
  ,
  {
    role_id: 3,
    permission_id: 162,
  },
  ,
  {
    role_id: 3,
    permission_id: 167,
  },
  {
    role_id: 3,
    permission_id: 172,
  },
];

async function main() {
  await prisma.department.createMany({
    data: department,
  });
  await prisma.designation.createMany({
    data: designation,
  });
  await prisma.employmentStatus.createMany({
    data: employmentStatus,
  });
  await prisma.shift.createMany({
    data: shifts,
  });
  await prisma.award.createMany({
    data: award,
  });
  await prisma.role.createMany({
    data: roles.map((role) => {
      return {
        name: role,
      };
    }),
  });
  await prisma.permission.createMany({
    data: permissions.map((permission) => {
      return {
        name: permission,
      };
    }),
  });
  for (let i = 1; i <= permissions.length; i++) {
    await prisma.rolePermission.create({
      data: {
        role: {
          connect: {
            id: 1,
          },
        },
        permission: {
          connect: {
            id: i,
          },
        },
      },
    });
  }
  const adminHash = await bcrypt.hash("admin", saltRounds);
  await prisma.user.create({
    data: {
      firstName: "omega",
      lastName: "solution",
      userName: "admin",
      password: adminHash,
      employmentStatusId: 1,
      departmentId: 1,
      roleId: 1,
      shiftId: 1,
    },
  });

  await prisma.account.createMany({
    data: account,
  });
  await prisma.subAccount.createMany({
    data: subAccount,
  });
  await prisma.appSetting.create({
    data: settings,
  });
  await prisma.contactSource.createMany({
    data: contactSource,
  });
  await prisma.industry.createMany({
    data: industry.map((industry) => {
      return {
        industryName: industry,
      };
    }),
  });
  await prisma.contactStage.createMany({
    data: contactStage.map((stage) => {
      return {
        contactStageName: stage,
      };
    }),
  });
  await prisma.companyType.createMany({
    data: companyType.map((type) => {
      return {
        companyTypeName: type,
      };
    }),
  });
  await prisma.opportunityStage.createMany({
    data: opportunityStage.map((stage) => {
      return {
        opportunityStageName: stage,
      };
    }),
  });
  await prisma.opportunityType.createMany({
    data: OpportunityType.map((type) => {
      return {
        opportunityTypeName: type,
      };
    }),
  });
  await prisma.opportunitySource.createMany({
    data: opportunitySource.map((source) => {
      return {
        opportunitySourceName: source,
      };
    }),
  });
  await prisma.quoteStage.createMany({
    data: quoteStage.map((stage) => {
      return {
        quoteStageName: stage,
      };
    }),
  });
  await prisma.crmTaskType.createMany({
    data: crmTaskType.map((type) => {
      return {
        taskTypeName: type,
      };
    }),
  });
  await prisma.crmTaskStatus.createMany({
    data: crmTaskStatus.map((status) => {
      return {
        taskStatusName: status,
      };
    }),
  });
  await prisma.crmTaskPriority.createMany({
    data: crmTaskPriority.map((priority) => {
      return {
        taskPriorityName: priority,
      };
    }),
  });
  await prisma.ticketStatus.createMany({
    data: ticketStatus.map((status) => {
      return {
        ticketStatusName: status,
      };
    }),
  });
  await prisma.ticketCategory.createMany({
    data: ticketCategory.map((category) => {
      return {
        ticketCategoryName: category,
      };
    }),
  });
  await prisma.ticketPriority.createMany({
    data: ticketPriority.map((priority) => {
      return {
        ticketPriorityName: priority,
      };
    }),
  });

  await prisma.company.createMany({
    data: company,
  });
  await prisma.contact.createMany({
    data: contact,
  });
  await prisma.opportunity.createMany({
    data: opportunity,
  });
  await prisma.product.createMany({
    data: product,
  });
  await prisma.quote.createMany({
    data: quote,
  });
  await prisma.quoteProduct.createMany({
    data: quoteProduct,
  });
  await prisma.emailConfig.createMany({
    data: emailConfig,
  });
  await prisma.customer.createMany({
    data: customer,
  });
  await prisma.rolePermission.createMany({
    data: rolePermission,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
