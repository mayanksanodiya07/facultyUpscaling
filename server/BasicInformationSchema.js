const mongoose = require('mongoose');
// console.log(mongoose)
mongoose.connect("mongodb://localhost:27017/Project").then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Basic Information Schema
const BasicInformationSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    full_name: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: false
    },
    contact_number: {
        type: String,
        required: true
    },
    email_address: {
        type: String,
        required: true
    }
});

const BasicInformation = mongoose.model("BasicInformation", BasicInformationSchema);

module.exports = BasicInformation;
