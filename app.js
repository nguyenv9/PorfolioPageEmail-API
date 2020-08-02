// runnning with nodemon instead of node allows for hot reloading. Wont have to close server manually after changes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Cross Origin Resource Sharing
const sendGrid = require('@sendgrid/mail');


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/api', (req, res, next) => { // getting data from the server
    res.send('API Status: Running')
});  

app.post('/api/email', (req, res, next) => {
    sendGrid.setApiKey('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');
    const msg = {
        to: 'vincentnguyen7516@gmail.com',
        from: req.body.email,
        subject: 'Website Contact',
        text: req.body.message
    }

    sendGrid.send(msg)
        .then(result => {
            res.status(200).json({
                success: true
            });  // that works successfully
        })
        .catch(err => {
            console.log('error: ', err);
            res.status(401).json({
                success: false
            });
        });
});

app.listen(3030, '0.0.0.0'); // 0.0.0.0 is same as localhost
