import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true,
        enum: ["HR", "Manager", "Sales"]
    },
    gender: {
        type: String,
        required: true
    },
    courses: [
        {
            type: String,
            default: []
        }
    ],
    image: {
        type: String,
        required: true,
        default: "",
    }
}, { timestamps: true});

export const Employee = mongoose.model("Employee", employeeSchema);