const express = require('express');
const path = require('path');
const session = require('express-session');
const pageRouter = require('./routes/pages');
const app = express();

// for body parser. to collect data that sent from the client.
app.use(express.urlencoded( { extended : false}));

// Serve static files. CSS, Images, JS files ... etc
app.use(express.static(path.join(__dirname, 'public')));


// Template engine. PUG
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// session
app.use(session({
    secret:'test',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));


//routes/middleware
app.use('/', pageRouter);

//error: 404 page not found
app.use((req, res, next) => {
    var err = new Error('page not found');
    err.status = 404;
    next(err);
})

//handling error
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message)
});

//setting up the server
app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});

module.exports = app;