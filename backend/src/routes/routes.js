const express = require('express');
const router = express.Router();
//----------------------------------------------------------
const mongoose = require('mongoose');
//----------------------------------------------------------
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//----------------------------------------------------------
require('../models/User');
const User = mongoose.model('users');
//----------------------------------------------------------
router.get('/list',(req,res)=>{

});

router.post('/new', async(req,res)=>{
    console.log('Usuário recebido');

    const salt = bcrypt.genSalt(10);

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    
});
//----------------------------------------------------------
module.exports = router;