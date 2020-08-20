const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv/config');
const equityRequest = require('./routes/equity/equity_routes');
const etfRequest = require('./routes/ETF/etf_routes');
const sgbRequest = require('./routes/SGB/sgb_routes');
const smeRequest = require('./routes/SME/sme_routes');


//Middlewares
app.use(cors());
app.use(express.json());
app.use('/equity', equityRequest);
app.use('/etf', etfRequest);
app.use('/sgb', sgbRequest);
app.use('/sme', smeRequest);

//Routes




//Start listening
app.listen(process.env.PORT, () => {
    console.log("Server started on " + process.env.PORT);
});