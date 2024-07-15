const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//----------------------------------------------------------
const Project = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});
//----------------------------------------------------------
mongoose.model('projects',Project);