import mongoose from "mongoose";

const Schema = mongoose.Schema;

function currencyGetter(v) {
    return (v / 100);
}

function currencySetter(v) {
    return Math.round(parseFloat(v) * 100); // Convert dollars to cents
}

const daySchema = new Schema(
    {
        date: String,
        revenue: {
            type: Number, // Store amount in cents
            get: currencyGetter,
        },
        expenses: {
            type: Number, // Store amount in cents
            get: currencyGetter,
        },
    },
    { toJSON: { getters: true } }
);

const monthSchema = new Schema(
    {
        month: String,
        revenue: {
            type: Number, // Store amount in cents
            get: currencyGetter,
        },
        expenses: {
            type: Number, // Store amount in cents
            get: currencyGetter,
        },
        operationalExpenses: {
            type: Number, // Store amount in cents
            get: currencyGetter,
        },
        nonOperationalExpenses: {
            type: Number, // Store amount in cents
            get: currencyGetter,
        },
    },
    { toJSON: { getters: true } }
);

const KPISchema = new Schema(
    {
        totalProfit: {
            type: Number, // Store amount in cents
            get: currencyGetter,
        },
        totalRevenue: {
            type: Number, // Store amount in cents
            get: currencyGetter,
        },
        totalExpenses: {
            type: Number, // Store amount in cents
            get: currencyGetter,
        },
        expensesByCategory: {
            type: Map,
            of: {
                type: Number, // Store amount in cents
                get: currencyGetter,
                // set: currencySetter,
            },
        },
        monthlyData: [monthSchema],
        dailyData: [daySchema],
    },
    { timestamps: true, toJSON: { getters: true } }
);

const KPI = mongoose.model("KPI", KPISchema);

export default KPI;
