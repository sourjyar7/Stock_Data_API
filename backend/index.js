const express = require('express');
const app = express();
const cors = require('cors');
const mongoose=require('mongoose');
require('dotenv/config');
const equityRequest = require('./routes/equity/equity_routes');
const etfRequest = require('./routes/ETF/etf_routes');
const sgbRequest = require('./routes/SGB/sgb_routes');
const smeRequest = require('./routes/SME/sme_routes');
const signUpRequest= require('./routes/Signup/Signup_routes');
const loginRequest=require('./routes/Login/login_routes');
const watchlistRequest=require('./routes/Watchlist/watchlist_request');

//Middlewares
app.use(cors());
app.use(express.json());

app.use('/equity', equityRequest);
app.use('/etf', etfRequest);
app.use('/sgb', sgbRequest);
app.use('/sme', smeRequest);
app.use('/signup',signUpRequest);
app.use('/login',loginRequest);
app.use('/watchlist',watchlistRequest);

//Connect to DB
mongoose.connect(process.env.DB_Connector,{ useNewUrlParser: true, useUnifiedTopology: true});
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database");
});  

//Start listening
app.listen(process.env.PORT, () => {
    console.log("Server started on " + process.env.PORT);
});