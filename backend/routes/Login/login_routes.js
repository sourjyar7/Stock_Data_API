const express=require('express');
const router=express.Router();
const User=require('../../models/users');

router.post('/',(req,resp)=>{
 if(req.body.username != null && req.body.password != null){
    let query={
        username: req.body.username,
        password: req.body.password
    } 
    User.find(query,(err,users)=>{
        if(err) 
          resp.send({msg: "error"});
        else if(users.length == 1)
          resp.send({msg: "loggedIn"});
        else
          resp.send({msg: "loginFailed"});    
    });
  }
  else
    resp.send({msg:"error"});
})    

module.exports=router;