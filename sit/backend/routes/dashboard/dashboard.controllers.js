const prisma = require("../../utils/prisma");
//(value)total amount of opportunity and quote, count at contact,comapny opp,qoute,task, task status way

const getDashboardData = async (req, res) => {
  try {
    // calculate total number of users
    const user = await prisma.user.count();
    const totalUsers = {
      count: user,
    };
    // calculate total salary from all users
    const salaryByUser = await prisma.user.findMany({
      include: {
        salaryHistory: {
          orderBy: {
            id: "desc",
          },
        },
      },
    });
    const Salary = salaryByUser.map((user) =>
      user.salaryHistory.map((salary) => salary.salary)
    );
    //remove the zero before totalSalary
    const calculate = Salary.flat().reduce((acc, cur) => acc + cur, 0);
    const totalSalary = {
      value: parseFloat(calculate),
    };

    //crm data

    //total opportunity and value
    const opportunityCount = await prisma.opportunity.aggregate({
      _count: {
        id: true,
      },
    });
    const opportunityValue = await prisma.opportunity.aggregate({
      _sum: {
        amount: true,
      },
    });
    const opportunity = {
      count: opportunityCount._count.id,
      value: opportunityValue._sum.amount,
    };

    //total quote and value
    const quoteCount = await prisma.quote.aggregate({
      _count: {
        id: true,
      },
    });

    const quoteValue = await prisma.quote.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

    const quote = {
      count: quoteCount._count.id,
      value: quoteValue._sum.totalAmount,
    };

    //total contact
    const contactCount = await prisma.contact.aggregate({
      _count: {
        id: true,
      },
    });

    const contact = {
      count: contactCount._count.id,
    };

    //total company
    const companyCount = await prisma.company.aggregate({
      _count: {
        id: true,
      },
    });

    const company = {
      count: companyCount._count.id,
    };

    //total amount of opportunity

    //total crmTask by status
    const crmTaskStatus = await prisma.crmTaskStatus.findMany();

    const task = await Promise.all(
      crmTaskStatus.map(async (status) => {
        //filter by status
        const task = await prisma.crmTask.aggregate({
          _count: {
            id: true,
          },
          where: {
            taskStatusId: status.id,
          },
        });
        return {
          statusName: status.taskStatusName,
          statusCount: task._count.id,
        };
      })
    );

    res.status(200).json({
      totalUsers,
      totalSalary,
      //crm data
      opportunity,
      quote,
      contact,
      company,
      task,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardData,
};
