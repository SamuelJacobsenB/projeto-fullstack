const jwt = require('jsonwebtoken');
//------------------------------------------------
module.exports = routeVerify = (req,res,next)=>{
    const token = req.body.token;
    const JWT_SECRET = process.env.JWT_SECRET;

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        console.log('Verificado com sucesso');
        next();
    } catch (error) {
        res.json({message: 'Você deve estar logado para entrar nesta área'});
    };
};