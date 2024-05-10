import express from "express";
import KPI from "../models/KPI.js";

const router = express.Router();

router.get("/kpis", async (req, res) => {
  try {
    const kpis = await KPI.find();
    res.status(200).json(kpis); // return to the frontend we 're getting a success given a 200
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;