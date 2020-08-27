const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    watchlist:{
        type: [String],
        default: ["ONGC","IOC","CIPLA","RELIANCE"]
    }
});

module.exports=mongoose.model('Users',userSchema);