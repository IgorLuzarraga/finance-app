import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define custom getter and setter for currency values
function currencyGetter(v) {
    return (v / 100).toFixed(2); // Convert cents to dollars with 2 decimal places
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
            set: currencySetter,
        },
        expenses: {
            type: Number, // Store amount in cents
            get: currencyGetter,
            set: currencySetter,
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
            set: currencySetter,
        },
        expenses: {
            type: Number, // Store amount in cents
            get: currencyGetter,
            set: currencySetter,
        },
        operationalExpenses: {
            type: Number, // Store amount in cents
            get: currencyGetter,
            set: currencySetter,
        },
        nonOperationalExpenses: {
            type: Number, // Store amount in cents
            get: currencyGetter,
            set: currencySetter,
        },
    },
    { toJSON: { getters: true } }
);

const KPISchema = new Schema(
    {
        totalProfit: {
            type: Number, // Store amount in cents
            get: currencyGetter,
            set: currencySetter,
        },
        totalRevenue: {
            type: Number, // Store amount in cents
            get: currencyGetter,
            set: currencySetter,
        },
        totalExpenses: {
            type: Number, // Store amount in cents
            get: currencyGetter,
            set: currencySetter,
        },
        expensesByCategory: {
            type: Map,
            of: {
                type: Number, // Store amount in cents
                get: currencyGetter,
                set: currencySetter,
            },
        },
        monthlyData: [monthSchema],
        dailyData: [daySchema],
    },
    { timestamps: true, toJSON: { getters: true } }
);

const KPI = mongoose.model("KPI", KPISchema);

export default KPI;
