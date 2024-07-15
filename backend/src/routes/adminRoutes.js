const express = require('express');
const router = express.Router();
//----------------------------------------------------------
router.post('/verify', (req, res)=>{
    
});

router.post('/projets', async(req, res)=>{
    console.log('Dados do projeto recebidos');

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
                res.json(token);

                console.log('Usuário salvo com sucesso');
            })
            .catch((err)=>{
                console.log(err);
            });
    };
});
//----------------------------------------------------------
module.exports = router;