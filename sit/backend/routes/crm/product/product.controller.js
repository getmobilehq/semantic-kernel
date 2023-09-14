const prisma = require("../../../utils/prisma");
const { getPagination } = require("../../../utils/query");

//create product
const createProduct = async (req, res) => {
  if (req.query.query === "deletemany") {
    try {
      const deleteManyProduct = await prisma.product.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deleteManyProduct);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query.query === "createmany") {
    try {
      const createManyProduct = await prisma.product.createMany({
        data: req.body,
        skipDuplicates: true,
      });
      return res.status(201).json(createManyProduct);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const createProduct = await prisma.product.create({
        data: {
          productName: req.body.productName,
        },
      });
      return res.status(201).send(createProduct);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
};

//get all products

const getAllProducts = async (req, res) => {
  if (req.query.query === "all") {
    try {
      const product = await prisma.product.findMany({
        orderBy: {
          id: "desc",
        },
        include: {
          quoteProduct: true,
        },
      });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else if (req.query.query === "search") {
    try {
      const { skip, limit } = getPagination(req.query);
      const getAllProduct = await prisma.product.findMany({
        orderBy: {
          id: "desc",
        },
        where: {
          OR: [
            {
              productName: {
                contains: req.query.key,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          quoteProduct: true,
        },
        skip: Number(skip),
        take: Number(limit),
      });

      const response = {
        getAllProduct: getAllProduct,
        totalProductCount: {
          _count: {
            id: getAllProduct.length,
          },
        },
      };
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query.status === "true") {
    try {
      const { skip, limit } = getPagination(req.query);
      const getAllProduct = await prisma.product.findMany({
        orderBy: {
          id: "desc",
        },
        where: {
          status: true,
        },
        include: {
          quoteProduct: true,
        },
        skip: Number(skip),
        take: Number(limit),
      });
      return res.status(200).json(getAllProduct);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const { skip, limit } = getPagination(req.query);
      const getAllProduct = await prisma.product.findMany({
        orderBy: {
          id: "desc",
        },
        where: {
          status: false,
        },
        include: {
          quoteProduct: true,
        },
        skip: Number(skip),
        take: Number(limit),
      });
      return res.status(200).json(getAllProduct);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

//get single product
const getSingleProduct = async (req, res) => {
  try {
    const getSingleProduct = await prisma.product.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        quoteProduct: true,
      },
    });
    return res.status(200).json(getSingleProduct);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//update product
const updateProduct = async (req, res) => {
  try {
    const updateProduct = await prisma.product.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        productName: req.body.productName,
      },
    });
    return res.status(200).json(updateProduct);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//delete product
const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await prisma.product.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (deleteProduct) {
      return res.status(200).json({ message: "Product Deleted Successfully" });
    }
    return res.status(200).json(deleteProduct);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
