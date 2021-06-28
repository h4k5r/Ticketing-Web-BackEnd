const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/adminRoute');
const userRoutes = require('./routes/userRoute');

const app = express();

app.use(bodyParser.json());
app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

app.use('/admin',adminRoutes);
app.use('/user',userRoutes);



app.listen(8080);