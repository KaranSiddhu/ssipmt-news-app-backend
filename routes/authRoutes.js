const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User ');
const jwt = require('jsonwebtoken');
const { jwtkey } = require('../keys.js');

router.post('/signup',async (req, res)=>{

    const { email, password } = req.body;
    try{
        const user = new User({email, password});
        await user.save();
        const token = jwt.sign({userID: user._id}, jwtkey);

        res.status(200).send({token});

    }catch(err){
        res.status(404).json({
            status:"Fail",
            error:err.message
        });
    }
    
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(422).json({
            status:"Fail",
            error: "Must enter Email and Password"
        })
    }
    
    const user = await User.findOne({email});
    if(!user){
        return res.status(422).json({
            status:"Fail",
            error:"Must enter Email and Password"
        });
    }
    try{
        await user.comparePassword(password);
        const token = jwt.sign({userID: user._id}, jwtkey);
        res.send({token});
    }catch(err){
        res.status(422).json({
            status:"Fail",
            error:"Must enter Email and Password"
        });
    }

});

module.exports = router;