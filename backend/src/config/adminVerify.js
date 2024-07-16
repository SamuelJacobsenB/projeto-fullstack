const jwt = require('jsonwebtoken');
//------------------------------------------------
module.exports = adminVerify = (req,res,next)=>{
    const token = req.body.token;
    const JWT_SECRET = process.env.JWT_SECRET;

    try {
        const user = jwt.verify(token, JWT_SECRET);
        if(user.userType == 1){
            req.user = user;
            next();
        } else {
            res.json({message: 'Você não pode entrar em uma área restrita'});
        };
    } catch (error) {
        res.json({message: 'Você deve estar logado'});
    };
};