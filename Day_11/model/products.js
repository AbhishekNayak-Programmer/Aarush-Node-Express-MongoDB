const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: { type: Number, required: true },
    desc: { type: String },
    inStock: { type: Boolean, default: true },
    category: { type: String },
    image: {
      type: String,
      default: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("products", productSchema);

module.exports = Products;
