import express from "express";
import Product from "../models/PRODUCT.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find(); //gives our list of products
    res.status(200).json(products); // all products are sent to the frontend given a success 200
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
