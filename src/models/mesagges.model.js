import { Schema , model } from "mongoose";

const mesaggeCollection = "mesagges";

const mesaggesSchema = new Schema ({
    user: {type: String , required:  true},
    message: {type: String, required: true}
})

export const messaggeModel = model( mesaggeCollection , mesaggesSchema )