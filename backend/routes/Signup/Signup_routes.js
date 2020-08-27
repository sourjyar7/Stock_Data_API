const express=require('express');
const router=express.Router();
const User=require('../../models/users');

router.post('/',(req,resp)=>{
    if(req.body.username != null && req.body.password != null){
       
        
            const user=new User(req.body);
            user.save((err,user)=>{
               if(err) 
                 resp.send({msg: "error"})
               else
                 resp.send({msg: "signedUp"}); 
            });
         
          
       
        }
        
    
    else
      resp.send({msg:"error"});   
       
    });


module.exports=router;