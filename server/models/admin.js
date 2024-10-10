const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        // required: true
    },
    // email: {
    //     type: String,
    //     // required: true,
    //     // unique: true
    // },
    phone_number: {
        type: String,
        // required: false
    },
    // permissions: {
    //     type: [String], // Example: ['manage-faculty', 'review-appraisals']
    //     default: ['review-appraisals']
    // },
    date_of_joining: {
        type: Date,
        default: Date.now
    },
    // last_login: {
    //     type: Date
    // },
    // security_question: {
    //     type: String
    // },
    // security_answer: {
    //     type: String
    // }
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
