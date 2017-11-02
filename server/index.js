const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/dist/')));









app.listen(3100, () => {
  console.log('listening on port 3100...');
});