"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const express_1 = __importDefault(require("express"));
const path = require("path");
const bodyparser = __importStar(require("body-parser"));
const users_1 = __importDefault(require("./routes/users"));
const post_1 = __importDefault(require("./routes/post"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
var app = express_1.default();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express_1.default.static(path.join(__dirname, 'public')));
app.use(bodyparser.json());
app.use(cors_1.default());
app.use('/', users_1.default);
app.use('/post', post_1.default);
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
mongoose_1.default.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
exports.db = mongoose_1.default.connection;
exports.db.on('error', console.error.bind(console, 'connection error'));
exports.db.once('open', () => {
    var server = app.listen(app.get('port'), function () {
        console.log('server open');
        debug('Express server listening on port ' + server.address());
    });
});
