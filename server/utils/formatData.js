import { kpis, products, transactions } from '../data/data.js'

// Define a function to convert currency strings to cents
function currencyStringToCents(currencyString) {
    const numericValue = parseFloat(currencyString.replace(/[^0-9.-]+/g, ""));
    return Math.round(numericValue * 100);
}

// Iterate through kpis array and modify currency fields
export const modifiedKPIs = kpis.map(kpi => ({
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

export const modifiedProducts = products.map(product => ({
    ...product,
    price: currencyStringToCents(product.price),
    expense: currencyStringToCents(product.expense),
}));

export const modifiedTransactions = transactions.map(transaction => ({
    ...transaction,
    amount: currencyStringToCents(transaction.amount),
}));

