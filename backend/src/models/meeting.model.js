import { Schema } from "mongoose";
import mongoose from "mongoose";

const meetingSchema = new Schema({
    userId: {
        type: String
    },

    meetingCode: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ["created", "history"],
        default: "history"
    },

    date: {
        type: Date,
        default: Date.now
    }
});
const Meeting=mongoose.model("Meeting",meetingSchema)
export {Meeting};