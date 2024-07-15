const express = require('express');
const router = express.Router();
//----------------------------------------------------------
const mongoose = require('mongoose');
//----------------------------------------------------------
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//----------------------------------------------------------
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
//----------------------------------------------------------
require('../models/User');
const User = mongoose.model('users');
//----------------------------------------------------------
router.get('/list',(req,res)=>{
    User.find()
        .then((el)=>{
            res.json(el);
        })
        .catch((err)=>{
            console.log(err);
        });
});

router.post('/new', async(req,res)=>{
    console.log('Usuário recebido');

    let erros = [];

    if(!req.body.name || req.body.name == '' || req.body.name == undefined || req.body.name == null){
        erros.push({message: 'Nome inválido'});
    };

    if(!req.body.email || req.body.email == '' || req.body.email == undefined || req.body.email == null){
        erros.push({message: 'Email inválido'});
    };

    if(!req.body.password || req.body.password == '' || req.body.password == undefined || req.body.password == null){
        erros.push({message: 'Senha inválida'});
    };

    const ifUser = await User.findOne({email: req.body.email});

    if(ifUser) {
        erros.push('Email do usuário já registrado');
    };

    if(erros.length > 0){
        console.log(erros);
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
    
        const user = {
            _id: this._id,
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        };

        await new User(user).save()
            .then((user)=>{
                const token = jwt.sign({user: user._id}, JWT_SECRET, {expiresIn: 7200});
                res.cookie('token', token, {httpOnly: true});

                console.log('Usuário salvo com sucesso');
            })
            .catch((err)=>{
                console.log(err);
            });
    };
});

router.post('/login', async(req,res)=>{
    console.log('Usuário recebido');

    let erros = [];

    if(!req.body.email || req.body.email == '' || req.body.email == undefined || req.body.email == null){
        erros.push({message: 'Email inválido'});
    };

    if(!req.body.password || req.body.password == '' || req.body.password == undefined || req.body.password == null){
        erros.push({message: 'Senha inválida'});
    };

    const user = await User.findOne({email: req.body.email});

    if(!user) {
        erros.push('Usuário não existe');
    };

    if(erros.length > 0){
        res.json({erros: erros});
    } else {
        const verifyPassword = await bcrypt.compare(req.body.password, user.password);

        if(verifyPassword == true){
            const token = jwt.sign({user: user._id}, JWT_SECRET, {expiresIn: 7200});
            res.json(token);

            console.log('Usuário logado com sucesso');
        } else {
            console.log('Senha incorreta');
        };
    };
});
//----------------------------------------------------------
module.exports = router;