const express = require('express');
const router = express.Router();
//----------------------------------------------------------
const mongoose = require('mongoose');
//----------------------------------------------------------
require('../models/Project');
const Project = mongoose.model('projects');
//----------------------------------------------------------
router.post('/verify', (req, res)=>{
    
});

router.post('/projets', async(req, res)=>{
    console.log('Dados do projeto recebidos');

    let erros = [];

    if(!req.body.name || req.body.name == '' || req.body.name == undefined || req.body.name == null){
        erros.push({message: 'Nome inválido'});
    };

    if(!req.body.content || req.body.content == '' || req.body.content == undefined || req.body.content == null){
        erros.push({message: 'Conteúdo inválido'});
    };

    if(!req.body.description || req.body.description == '' || req.body.description == undefined || req.body.description == null){
        erros.push({message: 'Descrição inválida'});
    };

    if(!req.body.technologies || req.body.technologies == '' || req.body.technologies == undefined || req.body.technologies == null){
        erros.push({message: 'Descreva as tecnologias'});
    };

    const ifProject = await Project.findOne({name: req.body.name});

    if(ifProject) {
        erros.push('Esta projeto já está registrado');
    };

    if(erros.length > 0){
        console.log(erros);
    } else {
        const project = {
            name: req.body.name,
            content: req.body.content,
            description: req.body.description,
            technologies: req.body.technologies
        };

        await new Project(project).save()
            .then((user)=>{
                console.log('Projeto salvo com sucesso');
            })
            .catch((err)=>{
                console.log(err);
            });
    };
});
//----------------------------------------------------------
module.exports = router;