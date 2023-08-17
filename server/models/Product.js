import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define custom getter and setter for currency values
function currencyGetter(v) {
    return (v / 100).toFixed(2); // Convert cents to dollars with 2 decimal places
}

function currencySetter(v) {
    return Math.round(parseFloat(v) * 100); // Convert dollars to cents
}

const ProductSchema = new Schema(
    {
        price: {
            type: Number, // Store amount in cents
            get: currencyGetter,
            set: currencySetter,
        },
        expense: {
            type: Number, // Store amount in cents
            get: currencyGetter,
            set: currencySetter,
        },
        transactions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Transaction",
            },
        ],
    },
    { timestamps: true, toJSON: { getters: true } }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
