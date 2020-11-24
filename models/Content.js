const mongoose = require('mongoose');

const moment = require('moment-timezone');
const dateIndia = moment.tz(Date.now(), "Asia/Kolkata");

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
        type:Date,
        default:Date.now
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