const { getPagination } = require("../../../utils/query");
const prisma = require("../../../utils/prisma");

//create task
const createTask = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyCrmTask = await prisma.crmTask.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deleteManyCrmTask);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query.query === "createmany") {
    try {
      const date = req.body.map((item) => {
        item.dueDate = new Date(item.dueDate);
        return item;
      });

      const createManyPromises = date.map(async (item) => {
        const createManyCrmTask = await prisma.crmTask.createMany({
          data: item,
          skipDuplicates: true,
        });
        return createManyCrmTask;
      });

      const createManyResults = await Promise.all(createManyPromises);
      return res.status(201).json({ count: createManyResults.length });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const createTask = await prisma.crmTask.create({
        data: {
          taskName: req.body.taskName,
          taskType: {
            connect: {
              id: parseInt(req.body.taskTypeId),
            },
          },
          taskPriority: {
            connect: {
              id: parseInt(req.body.taskPriorityId),
            },
          },
          taskStatus: {
            connect: {
              id: parseInt(req.body.taskStatusId),
            },
          },
          assignee: req.body.assigneeId
            ? {
                connect: {
                  id: parseInt(req.body.assigneeId),
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
          company: req.body.companyId
            ? {
                connect: {
                  id: parseInt(req.body.companyId),
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
          dueDate: new Date(req.body.dueDate),
          notes: req.body.notes ? req.body.notes : undefined,
        },
      });
      return res.status(200).json(createTask);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

//get all task
const getAllTask = async (req, res) => {
  if (req.query.query === "all") {
    try {
      const getAllTask = await prisma.crmTask.findMany({
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
          contact: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          assignee: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
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
          taskType: {
            select: {
              id: true,
              taskTypeName: true,
            },
          },
        },
      });

      //concat first name and last name
      getAllTask.map((item) => {
        item.contact.fullName =
          item.contact.firstName + " " + item.contact.lastName;
        item.assignee.fullName =
          item.assignee.firstName + " " + item.assignee.lastName;
        return item;
      });

      return res.status(200).json(getAllTask);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.query.status === "true") {
    const { skip, limit } = getPagination(req.query);
    try {
      const getAllTask = await prisma.crmTask.findMany({
        orderBy: {
          id: "desc",
        },
        where: {
          status: true,
        },
        include: {
          company: {
            select: {
              companyName: true,
            },
          },
          contact: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          assignee: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          taskPriority: {
            select: {
              taskPriorityName: true,
            },
          },
          taskStatus: {
            select: {
              taskStatusName: true,
            },
          },
          taskType: {
            select: {
              taskTypeName: true,
            },
          },
        },
        skip: Number(skip),
        take: Number(limit),
      });
      const aggregation = await prisma.crmTask.aggregate({
        where: {
          status: true,
        },
        _count: {
          id: true,
        },
      });
      return res.status(200).json({ getAllTask, aggregation });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.query.status === "false") {
    const { skip, limit } = getPagination(req.query);
    try {
      const getAllTask = await prisma.crmTask.findMany({
        orderBy: {
          id: "desc",
        },
        where: {
          status: false,
        },
        include: {
          company: {
            select: {
              companyName: true,
            },
          },
          contact: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          assignee: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          taskPriority: {
            select: {
              taskPriorityName: true,
            },
          },
          taskStatus: {
            select: {
              taskStatusName: true,
            },
          },
          taskType: {
            select: {
              taskTypeName: true,
            },
          },
        },
        skip: Number(skip),
        take: Number(limit),
      });
      const aggregation = await prisma.crmTask.aggregate({
        where: {
          status: false,
        },
        _count: {
          id: true,
        },
      });
      return res.status(200).json({ getAllTask, aggregation });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

//get single task
const getSingleTask = async (req, res) => {
  try {
    const getSingleTask = await prisma.crmTask.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        company: true,
        contact: true,
        assignee: true,
        taskPriority: true,
        taskStatus: {
          select: {
            id: true,
            taskStatusName: true,
          },
        },
        taskType: true,
        opportunity: true,
        quote: true,
      },
    });

    getSingleTask.contact.fullName =
      getSingleTask.contact.firstName + " " + getSingleTask.contact.lastName;
    getSingleTask.assignee.fullName =
      getSingleTask.assignee.firstName + " " + getSingleTask.assignee.lastName;
    return res.status(200).json(getSingleTask);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//update task
const updateTask = async (req, res) => {
  try {
    const updateTask = await prisma.crmTask.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    return res.status(200).json(updateTask);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//delete task
const deleteTask = async (req, res) => {
  try {
    await prisma.crmTask.update({
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
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
