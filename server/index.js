const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helpers = require('./helpers.js');


const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist/')));


app.post('/api/search', function (req, res) {
  let location = req.body.location;
  let userQuery = req.body.query;
  helpers.menusByCity(location, userQuery, function(data) {
    if (data) {
      console.log('This is the data for this search', data);
      res.status(201).send(data);
    }
  });
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port 3000...');
});
