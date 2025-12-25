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

module.exports = router;
