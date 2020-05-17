global.__basedir = __dirname;
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors');
require(__basedir + '/config/globals');


const app = express();
app.use(cors());
app.use(pino);

app.use('/static', express.static('public'))

//console.log(__dirname);

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

const HomeRouter = require('./routes/Home/Auth');
app.use(HomeRouter);

app.listen(3030, () =>
	console.log('Express server is running on localhost:3030')
);