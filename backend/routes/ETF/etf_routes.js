const express=require('express');
const router=express.Router();
const axios = require('axios').default;

router.post('/etfList',(req,res)=>{
    const index=req.query.s;
    const url = `https://www.nseindia.com/api/`+index;
    console.log(url);
    axios.get(url).then((resp)=>{
        //console.log(resp.data)
        const data = JSON.parse(JSON.stringify(resp.data))
        if(data.msg === "no data found"){
            console.log("No ETF found")
            res.send({"error":"No ETF found"})
        }
        else{
        //console.log(data)
            res.send(data)
            console.log("ETF found")
        }
    }).catch((err)=>{
        console.log(err)
        res.send({"error" : "Unexpected error occured","errorMsg" : err})
    })
})


router.post('/etf_priceInfo',(req,res) => {
    const stockName = req.query.s;
    const url = `https://www.nseindia.com/api/quote-equity?symbol=${stockName}`
    
    axios.get(url).then((resp)=>{
        //console.log(resp.data)
        const data = JSON.parse(JSON.stringify(resp.data))
        if(data.msg === "no data found"){
            console.log("No stock found")
            res.send({"error":"No stock found"});
        }
        else{
            res.send(data)
            console.log("Stock found");
        }
    }).catch((err)=>{
        console.log(err)
        res.send({"error" : "Unexpected error occured","errorMsg" : err})
    })
      
})

router.post('/etf_tradeInfo',(req,res) => {
    const stockName = req.query.s;
    const url = `https://www.nseindia.com/api/quote-equity?symbol=${stockName}&section=trade_info`
       
    axios.get(url).then((resp)=>{
        //console.log(resp.data)
        const data = JSON.parse(JSON.stringify(resp.data))
        if(data.msg === "no data found"){
            console.log("No stock found")
            res.send({"error":"No stock found"});
        }
        else{
            res.send(data)
            console.log("Stock found");
        }
    }).catch((err)=>{
        console.log(err)
        res.send({"error" : "Unexpected error occured","errorMsg" : err})
    })
      
})

module.exports=router;
