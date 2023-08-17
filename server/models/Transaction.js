import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define custom getter and setter for currency values
function currencyGetter(v) {
    return (v / 100).toFixed(2); // Convert cents to dollars with 2 decimal places
}

function currencySetter(v) {
    return Math.round(parseFloat(v) * 100); // Convert dollars to cents
}

const TransactionSchema = new Schema(
    {
        buyer: {
            type: String,
            required: true,
        },
        amount: {
            type: Number, // Store amount in cents
            get: currencyGetter,
            set: currencySetter,
        },
        productIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    { timestamps: true, toJSON: { getters: true } }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
