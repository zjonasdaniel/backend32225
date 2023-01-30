import { Schema , model } from "mongoose";

const cartCollection = "carts";

const cartSchema = new Schema ({
    products: {type: Array, required:true}
})

export const cartModel = model( cartCollection , cartSchema )