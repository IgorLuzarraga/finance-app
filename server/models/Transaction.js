import mongoose from "mongoose";

const Schema = mongoose.Schema;

function currencyGetter(v) {
    return (v / 100);
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
