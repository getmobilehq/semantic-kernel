const { getPagination } = require("../../../utils/query");
const prisma = require("../../../utils/prisma");

//create a new note
const createNote = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyNote = await prisma.note.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deleteManyNote);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const createNote = await prisma.note.create({
        data: {
          noteOwner: {
            connect: {
              id: parseInt(req.body.noteOwnerId),
            },
          },
          title: req.body.title,
          description: req.body.description,
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
      return res.status(201).json(createNote);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

//get all notes
const getAllNotes = async (req, res) => {
  if (req.query.query === "all") {
    try {
      const getAllNote = await prisma.note.findMany({
        orderBy: {
          id: "desc",
        },
        include: {
          noteOwner: {
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

      getAllNote.map((note) => {
        note.noteOwner.fullName =
          note.noteOwner.firstName + " " + note.noteOwner.lastName;
      });

      return res.status(200).json(getAllNote);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query.query === "search") {
    try {
      const { skip, limit } = getPagination(req.query);
      const getAllNote = await prisma.note.findMany({
        orderBy: {
          id: "desc",
        },
        where: {
          OR: [
            {
              title: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          noteOwner: {
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

      getAllNote.map((note) => {
        note.noteOwner.fullName =
          note.noteOwner.firstName + " " + note.noteOwner.lastName;
      });

      const totalNoteCount = {
        _count: {
          id: getAllNote.length,
        },
      };
      return res.status(200).json({ getAllNote, totalNoteCount });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query) {
    //get the boolean status
    const boolenStatus = req.query.status?.split(",").map(JSON.parse);

    //get all company with pagination
    if (boolenStatus.length === 2) {
      try {
        const { skip, limit } = getPagination(req.query);
        const getAllNote = await prisma.note.findMany({
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
            noteOwner: {
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

        const totalNoteCount = await prisma.note.aggregate({
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

        getAllNote.map((note) => {
          note.noteOwner.fullName =
            note.noteOwner?.firstName + " " + note.noteOwner.lastName;
        });

        return res.status(200).json({
          getAllNote,
          totalNoteCount,
        });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    } else if (boolenStatus.length === 1) {
      try {
        const { skip, limit } = getPagination(req.query);
        const getAllNote = await prisma.note.findMany({
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
            noteOwner: {
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
        const totalNoteCount = await prisma.note.aggregate({
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

        getAllNote.map((note) => {
          note.noteOwner.fullName =
            note.noteOwner.firstName + " " + note.noteOwner.lastName;
        });

        return res.status(200).json({
          getAllNote,
          totalNoteCount,
        });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }
};

//get a single note
const getSingleNote = async (req, res) => {
  try {
    const getSingleNote = await prisma.note.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        noteOwner: {
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

    getSingleNote.noteOwner.fullName =
      getSingleNote.noteOwner.firstName +
      " " +
      getSingleNote.noteOwner.lastName;

    return res.status(200).json(getSingleNote);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//update a note
const updateNote = async (req, res) => {
  try {
    const updateNote = await prisma.note.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });

    return res.status(200).json(updateNote);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//delete a note
const deleteNote = async (req, res) => {
  try {
    const deleteNote = await prisma.note.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (deleteNote)
      return res.status(200).json({ message: "Note deleted SuccessFully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
};
