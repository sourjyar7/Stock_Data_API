const express=require('express');
const router=express.Router();
const User=require('../../models/users');
//Fetching watchlist
router.post('/get',(req,resp)=>{
   if(req.body.username != null && req.body.password != null){ 
    let query={
        username: req.body.username,
        password: req.body.password
    } 
    User.find(query,(err,users)=>{
        if(err) 
          return console.log("error");
        else
          resp.send(users);  
    });
  }
  else{
      resp.send({msg:"error"});
  }
})
//Adding to the watchlist
router.patch('/add',(req,resp)=>{
    let condition={
        username: req.body.username,
        password: req.body.password,
   };
   if(req.body.item != "" && req.body.item != null){
    User.findOne(condition,(err,user)=>{
        if(err)
          resp.send({msg: "error"});
        else{
          user.watchlist.push(req.body.item);
          user.save();
          resp.send({msg:"added"});
        } 
    });
  }
  else
    resp.send({msg:"error"});
})
//Deleting from watchlist
router.delete('/delete',(req,resp)=>{
  if(req.body.username != null && req.body.password != null){
    let condition={
        username: req.body.username,
        password: req.body.password,
   };
    User.findOne(condition,(err,user)=>{
        let index=user.watchlist.indexOf(req.body.item);
        if(index != -1){
          user.watchlist.splice(index,1);
          user.save();
          resp.send({msg:"deleted"});
        }
        else{
          resp.send({msg: "error"});
        }
    });
  }
  else
   resp.send({msg:"error"}); 
})

module.exports=router;