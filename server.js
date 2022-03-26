const express = require('express');
const bodyParser = require('body-parser');
var path        = require("path");
const cors = require('cors');
const { host, port } = require('./config');
const { connections } = require('./config/database');
const errorHandler = require('./middlewares/error-handler');
const routes = require('./routes');

const app = express();
app.use(cors());

global.appRoot = path.join(__dirname);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const directory = path.join(__dirname, 'uploads');
app.use('/v1/uploads', express.static(directory));

app.set('locale','en');
global.LOCALE= app.get('locale');
process.env.LOCALE= app.get('locale');

app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


// API routes
app.use(routes);

app.get('/', (req, res, next) => {
    res.send('working server');
})

// Error Middlewares
app.use(errorHandler.methodNotAllowed);

app.use(errorHandler.genericErrorHandler);

const server = app.listen(port, async () => {
    console.log(`Server up successfully - host: ${host} port: ${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log('possibly unhandled rejection happened');
    console.log(err.message);
});

const closeHandler = () => {
    Object
        .values(connections)
        .forEach((connection) => connection.close());

    server.close(() => {
        console.log('Server is stopped succesfully');
        process.exit(0); /* eslint-disable-line */
    });
};

process.on('SIGTERM', closeHandler);
process.on('SIGINT', closeHandler);
