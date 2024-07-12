const express = require('express');
const router = express.Router();
//----------------------------------------------------------
const mongoose = require('mongoose');
//----------------------------------------------------------
require('../models/User');
const User = mongoose.model('users');
//----------------------------------------------------------
router.get('/',(req,res)=>{
    res.json([
        {name: 'enfuwe eg seg egf', email: 'kneowjt24t2ghnon'},
        {name: 'enfefefwefuwee gseg e esgg f', email: 'kneofwaqwwjnon'},
        {name: 'eewfw fwefef', email: 'kneowjsfseffnon'},
        {name: 'enfewfe wefw wef ef', email: 'kneowbrrjrjrjnon'},
        {name: 'enfsseg esgse gesguwef', email: 'kneowjwertwtnon'}
    ]);
});
//----------------------------------------------------------
module.exports = router;