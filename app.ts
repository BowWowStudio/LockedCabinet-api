import debug = require('debug');
import express from "express";
import path = require('path');

import routes from './routes/index';
import users from './routes/users';

var app :express.Application= express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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

var server = app.listen(app.get('port'), function () {
    console.log('hi');
    debug('Express server listening on port ' + server.address());
});
