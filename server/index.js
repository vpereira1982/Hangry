const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helpers = require('./helpers.js');


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/dist/')));



//create get request by location
//app.get(...)

// helpers.getNamesAndKeys('Seattle', 'Vegan', function(data) {
//   if (data) {
//     console.log('getNamesAndKeys success: ', data);
//   }
// });

helpers.menusByCity('Seattle', 'Pepperoni Pizza', function(data) {
  if (data) {
    console.log('success!!!: ', data);
  }
});





app.listen(3000, () => {
  console.log('listening on port 3000...');
});