const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/adminRoute');
const userRoutes = require('./routes/userRoute');

const app = express();

app.use(bodyParser.json());

app.use('/admin',adminRoutes);
app.use('/user',userRoutes);



app.listen(8080);