require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./powerAPI/queries');

const app = express();
const port = process.env.PORT || 3456;


// DEFINE MIDDLEWARE:

//log requests:
app.use((req, res, next) => {
  console.log(`New request type ${req.method} on ${req.url}`)
  next();
});

//cors middleware
app.use(cors());
//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//serve build folder on static request
app.use(express.static('build'));


//DEFINE API ROUTER:
const api = express();

api.get('/session', db.getRows);
api.get('/session/average', db.getAverageByRows);
api.post('/session/date', db.getRowsByDate);
api.post('/session/time', db.getRowsByTime);
// api.get('/session/:active', db.getRowsByTime);
// api.get('/session/:reactive', db.getRowsByTime);
// api.get('/session/:voltage', db.getRowsByTime);
// api.get('/session/:submetering1', db.getRowsBySubMetering1);
// api.get('/session/:submetering2', db.getRowsBySubMetering2);
// api.get('/session/:submetering3', db.getRowsBySubMetering3);


app.use('/api', api);


//LISTEN TO PORT:
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});