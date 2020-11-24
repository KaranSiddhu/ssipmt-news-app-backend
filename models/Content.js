const mongoose = require('mongoose');

const istfun = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();


    return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
}

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
    },
    currentdate:{
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