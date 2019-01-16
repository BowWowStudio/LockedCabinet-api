import debug = require('debug');
import express from "express";
import path = require('path');
import * as bodyparser from 'body-parser';
import routes from './routes/index';
import users from './routes/users';
import post from './routes/post';
import mongoose from 'mongoose';
import cors from 'cors';
var app :express.Application= express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json());
app.use(cors());
app.use('/', users);
app.use('/post', post);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err:any = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req:express.Request, res:express.Response, next:any) => {
        res.status(err['status'] || 500);
        res.end('hi');
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req:express.Request, res:express.Response, next:any) => {
    res.status(err.status || 500);
    res.send('hi');
});

app.set('port', process.env.PORT || 3000);
mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true});
export const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open', ()=>{
    var server = app.listen(app.get('port'), function () {
        console.log('server open');
        debug('Express server listening on port ' + server.address());
    });
})

