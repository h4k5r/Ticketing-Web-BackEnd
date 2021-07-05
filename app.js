const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongoUrl = require('./ApiKeys').mongoUrl;

const adminRoutes = require('./routes/adminRoute');
const userRoutes = require('./routes/userRoute');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-type,Authorization');
    next();
});

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('',authRoutes);

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(response => {
        app.listen(8080);
    })
    .catch(err => {

    })

