"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const express_1 = __importDefault(require("express"));
const path = require("path");
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
var app = express_1.default();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express_1.default.static(path.join(__dirname, 'public')));
app.use('/', index_1.default);
app.use('/users', users_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.end('hi');
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send('hi');
});
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
    console.log('hi');
    debug('Express server listening on port ' + server.address());
});
