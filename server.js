const express = require('express');
const mongoose = require('./config/connect.js');

const reservationRoute = require('./routes/reservation.js');
const userRoute = require('./routes/user.js');


require('./config/connect');

const app = express();
app.use(express.json());


app.use( '/reservation' , reservationRoute);
app.use( '/user' , userRoute);


app.listen( 3000 , ()=>{
    console.log('server work');
})