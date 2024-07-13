const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//----------------------------------------------------------
const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});
//----------------------------------------------------------
mongoose.model('users',User);