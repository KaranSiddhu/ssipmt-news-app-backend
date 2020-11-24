const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Content = mongoose.model('Content');

router.post('/news', async (req, res) => {
    const { title, description } = req.body;
    try{
        const content = new Content({title, description});
        await content.save();

        res.status(200).json({
            status:'success',
            data:{
                title,
                description
            }
        });

    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err.message
        });
    }
});

router.get('/news', (req, res) => {
    // Content.find({} ,(err, result) => {
    //     if(err){
    //         res.status(404).json({
    //             status:'fail',
    //             message:err
    //         });
    //     }else{
    //         res.status(200).send(result);
    //     }
    // });

    Content.find({}).sort({date: 'desc'}).exec((err, result) => { 
        if(err){
            res.status(404).json({
                status:'fail',
                message:err
            });
        }else{
            res.status(200).send(result);
        }
     });

});

router.delete('/news/:id', (req, res) => {
    Content.findByIdAndDelete(req.params.id, (err, docs) => {
        if (err){
            res.status(404).json({
                status:'fail',
                message:err
            });
        }else {
            res.status(200).json({
                status:'success',
                message:`Deleted: ${docs}`
            });
        }
    })
});

module.exports = router;