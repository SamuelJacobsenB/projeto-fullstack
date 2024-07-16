const express = require('express');
const router = express.Router();
//----------------------------------------------------------
const mongoose = require('mongoose');
//----------------------------------------------------------
require('../models/Project');
const Project = mongoose.model('projects');
//----------------------------------------------------------
const adminVerify = require('../config/adminVerify');
//----------------------------------------------------------
router.post('/verify', adminVerify, (req, res)=>{

});

router.post('/new', async(req, res)=>{
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
        erros.push('Este projeto já está registrado');
    };

    if(erros.length > 0){
        res.json({message: erros})
    } else {
        const project = {
            name: req.body.name,
            content: req.body.content,
            description: req.body.description,
            technologies: req.body.technologies
        };

        await new Project(project).save()
            .then(()=>{
                res.json({success_message: 'Projeto salvo com sucesso'});
            })
            .catch((err)=>{
                res.json({message: 'Erro ao salvar projeto'});
            });
    };
});

router.get('/list', (req, res)=>{
    Project.find()
        .then((project)=>{
            res.json(project);
        })
        .catch((err)=>{
            res.json({message: 'Erro ao gerenciar projetos'});
        });
});

router.post('/delete', async(req, res)=>{
    await Project.deleteOne({_id: req.body.id})
        .then(()=>{
            res.json({success_message: 'Projeto deletado com sucesso'});
            console.log('Projeto deletado com sucesso');
        })
        .catch((err)=>{
            res.json({message: 'Erro ao deletar projeto'});
            console.log('Erro ao deletar projeto');
        });
});
//----------------------------------------------------------
module.exports = router;