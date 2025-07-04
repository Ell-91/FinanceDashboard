import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";

import KPI from "./models/KPI.js";
import Product from "./models/PRODUCT.js";
import Transaction from "./models/Transaction.js";
import { kpis, products, transactions } from "./data/data.js";

/* CONFIGURATIONS - boilerplate */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

/* CORS Configuration */
app.use(
  cors({
    origin: "https://finance-dashboard-theta-six.vercel.app/", // replace with your actual Vercel domain
    methods: ["GET", "POST"],
    credentials: true,
  })
);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000; // how we access the enviornment variable we created in .env
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, "0.0.0.0", () => console.log(`Server Port: ${PORT}`)); // listen to our PORT/were we start up our server

    /* ADD DATA ONE TIME ONLY OR AS NEEDED */
    // await mongoose.connection.db.dropDatabase(); //before we seed our database with info, we drop the database we crrently have s we dont have duplicate data or errors
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
  })
  .catch((error) => console.log(`${error} did not connect`));
