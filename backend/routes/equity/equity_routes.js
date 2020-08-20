const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const regex = require('./equity_regex');

router.post('/index', (req, res) => {
    const str = req.query.s;
    const suffix = '%20';
    let part1 = regex.extractPattern(str, regex.pattern1);
    let part2 = (regex.extractPattern(str, regex.pattern2)).trim();
    let part3 = regex.extractPattern(str, regex.pattern3);
    let index = "";
    if (part3.localeCompare(part2) == 0)
        index = part1 + suffix + part2;
    else
        index = part1 + suffix + part2 + suffix + part3;


    const url = `https://www.nseindia.com/api/equity-stockIndices?index=` + index;
    console.log(url);

    axios.get(url).then((resp) => {
        //console.log(resp.data)
        const data = JSON.parse(JSON.stringify(resp.data))
        if (data.msg === "no data found") {
            console.log("No stock found")
            res.send({
                "error": "No stock found"
            })
        } else {
            //console.log(data)
            res.send(data)
            console.log("Stock found")
        }
    }).catch((err) => {
        console.log(err)
        res.send({
            "error": "Unexpected error occured",
            "errorMsg": err
        })
    })
})

router.post('/stock/tradeInfo', (req, res) => {
    const stockName = req.query.s;
    const url = `https://www.nseindia.com/api/quote-equity?symbol=${stockName}&section=trade_info`

    axios.get(url).then((resp) => {
        //console.log(resp.data)
        const data = JSON.parse(JSON.stringify(resp.data))
        if (data.msg === "no data found") {
            console.log("No stock found")
            res.send({
                "error": "No stock found"
            });
        } else {
            res.send(data)
            console.log("Stock found");
        }
    }).catch((err) => {
        console.log(err)
        res.send({
            "error": "Unexpected error occured",
            "errorMsg": err
        })
    })

})

router.post('/stock/priceInfo', (req, res) => {
    const stockName = req.query.s;
    const url = `https://www.nseindia.com/api/quote-equity?symbol=${stockName}`

    axios.get(url).then((resp) => {
        //console.log(resp.data)
        const data = JSON.parse(JSON.stringify(resp.data))
        if (data.msg === "no data found") {
            console.log("No stock found")
            res.send({
                "error": "No stock found"
            });
        } else {
            res.send(data)
            console.log("Stock found");
        }
    }).catch((err) => {
        console.log(err)
        res.send({
            "error": "Unexpected error occured",
            "errorMsg": err
        })
    })

})

module.exports = router;