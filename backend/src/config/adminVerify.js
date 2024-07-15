const jwt = require('jsonwebtoken');
//------------------------------------------------
module.exports = routeVerify = (req,res,next)=>{
    const token = req.body.token;
    const JWT_SECRET = process.env.JWT_SECRET;

    try {
        const user = jwt.verify(token, JWT_SECRET);
        if(user.userType == 1){
            req.user = user;
            console.log('Verificado com sucesso');
            next();
        } else {
            res.json({message: 'Área restrita'});
        };
    } catch (error) {
        res.json(error);
    };
};