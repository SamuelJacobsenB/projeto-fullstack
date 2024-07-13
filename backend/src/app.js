const express = require('express');
const app = express();
app.use(express.json());
//----------------------------------------------------------
require('dotenv').config();
const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;
//----------------------------------------------------------
const session = require('express-session');
const flash = require('connect-flash');

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(flash());
//----------------------------------------------------------
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});
//----------------------------------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
//----------------------------------------------------------
const helmet = require('helmet');
app.use(helmet());
//----------------------------------------------------------
const cors = require('cors');
const options = {
    methods: 'GET, POST, PUT, DELETE',
    headers: 'Content-Type',
    origin: 'http://localhost:5173'
};
app.use(cors(options));
//----------------------------------------------------------
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/projeto_fullstack');
//----------------------------------------------------------
const routes = require('./routes/routes');
app.use('/',routes);
//----------------------------------------------------------
app.listen(PORT,()=>console.log(`Server is running on port: ${PORT}`));