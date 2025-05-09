import mongoose from "mongoose";

const Schema = mongoose.Schema;
loadType(mongoose);

const daySchema = new Schema(
    {
      date: String,
      revenue: {
        type: Number,
        get: (v) => v / 100,
      },
      expenses: {
        type: Number,
        get: (v) => v / 100,
      },
    },
    { toJSON: { getters: true } }
  );
  
  const monthSchema = new Schema(
    {
      month: String,
      revenue: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (v) => v / 100,
      },
      expenses: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (v) => v / 100,
      },
      operationalExpenses: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (v) => v / 100,
      },
      nonOperationalExpenses: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (v) => v / 100,
      },
    },
    { toJSON: { getters: true } } // need this in order to use getters
  );

const KPISchema = new Schema(
    {
      totalProfit: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (v) => v / 100, //get call in oder to do this operation to get the value
      },
      totalRevenue: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (v) => v / 100,
      },
      totalExpenses: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (v) => v / 100,
      },
      expensesByCategory: {
        type: Map,
        of: {
          type: mongoose.Types.Currency,
          currency: "USD",
          get: (v) => v / 100,
        },
      },
      monthlyData: [monthSchema],
      dailyData: [daySchema],
    },
    { timestamps: true, toJSON: { getters: true } }
  );
  
  const KPI = mongoose.model("KPI", KPISchema);

  export default KPI;