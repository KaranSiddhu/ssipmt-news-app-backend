const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
});

contentSchema.pre('save', function(next){
    const now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

mongoose.model('Content',contentSchema);