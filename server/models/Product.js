import mongoose from "mongoose";

const Schema = mongoose.Schema;

function currencyGetter(v) {
    return (v / 100);
}

const ProductSchema = new Schema(
    {
        price: {
            type: Number, // Store amount in cents
            get: currencyGetter,
        },
        expense: {
            type: Number, // Store amount in cents
            get: currencyGetter,
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
