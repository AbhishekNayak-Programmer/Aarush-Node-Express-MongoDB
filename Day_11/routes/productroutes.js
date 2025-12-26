const express = require("express");
const router = express.Router();
const Product = require("../model/products");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      message: "Products",
      data: products,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
      status: "Error",
    });
  }
});

// Custom Filtering
// api/product?price=500
// api/product?minPrice=200&maxPrice=1000
// api/product?category=category1

// /products/filter
router.get("/filter", async (req, res) => {
  try {
    // console.log(req.query);
    let { price, minPrice, maxPrice, category } = req.query;
    let filter = {};

    if (price) {
      filter.price = Number(price);
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (category) {
      filter.category = category;
    }

    const data = await Product.find(filter);
    res.status(200).json({
      message: "Products",
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.find({ _id: req.params.id });
    if (!product) throw new Error("No product with this id exists");

    res.status(200).json({
      message: "Product Details By ID",
      product: product,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await Product.create(req.body);

    res.status(200).json({
      message: "Added a Products",
      data: response,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
      status: "Error",
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedData = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedData) throw new Error("Product Does not exist in the Database");

    res.status(200).json({
      message: "Updated Product Details",
      data: updatedData,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete({
      _id: req.params.id,
    });

    if (!deletedProduct)
      throw new Error("Product Does not exist in the Database");

    res.status(204).json({
      message: "Product Deleted",
      data: deletedProduct,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

module.exports = router;
