import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import kpiRoutes from "./routes/kpi.js"
import productRoutes from "./routes/product.js"
import transactionRoutes from "./routes/transaction.js"
import KPI from "./models/KPI.js"
import Product from "./models/Product.js"
import Transaction from "./models/Transaction.js"
import { kpis, products, transactions } from "./data/data.js"

// CONFIGURATIONS
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: "false" }))
app.use(cors())

// ROUTES 
app.use("/kpi", kpiRoutes)
app.use("/product", productRoutes)
app.use("/transaction", transactionRoutes)

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000


//
// Define a function to convert currency strings to cents
function currencyStringToCents(currencyString) {
    const numericValue = parseFloat(currencyString.replace(/[^0-9.-]+/g, ""));
    return Math.round(numericValue * 100);
}

// Iterate through kpis array and modify currency fields
const modifiedKPIs = kpis.map(kpi => ({
    ...kpi,
    totalProfit: currencyStringToCents(kpi.totalProfit),
    totalRevenue: currencyStringToCents(kpi.totalRevenue),
    totalExpenses: currencyStringToCents(kpi.totalExpenses),
    monthlyData: kpi.monthlyData.map(month => ({
        ...month,
        revenue: currencyStringToCents(month.revenue),
        expenses: currencyStringToCents(month.expenses),
        operationalExpenses: currencyStringToCents(month.operationalExpenses),
        nonOperationalExpenses: currencyStringToCents(month.nonOperationalExpenses),
    })),
    dailyData: kpi.dailyData.map(day => ({
        ...day,
        revenue: currencyStringToCents(day.revenue),
        expenses: currencyStringToCents(day.expenses),
    })),
    expensesByCategory: Object.fromEntries(
        Object.entries(kpi.expensesByCategory).map(([category, value]) => [
            category,
            currencyStringToCents(value),
        ])
    ),
}));

const modifiedProducts = products.map(product => ({
    ...product,
    price: currencyStringToCents(product.price),
    expense: currencyStringToCents(product.expense),
}));

const modifiedTransactions = transactions.map(transaction => ({
    ...transaction,
    amount: currencyStringToCents(transaction.amount),
}));
//

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`))

        /* ADD DATA ONE TIME ONLY OR AS NEEDED */
        // ADD DATA TO MONGDB
        // await mongoose.connection.db.dropDatabase();
        // KPI.insertMany(kpis);
        // KPI.insertMany(modifiedKPIs);
        // Product.insertMany(modifiedProducts);
        // Transaction.insertMany(modifiedTransactions);
    })
    .catch((error) => console.log("Conection error: ", error))