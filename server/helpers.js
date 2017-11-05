const request = require('request');

let getNamesAndKeys = (cityName, foodType, callback) => {
  var splitFood = foodType.split(' '); // "pepperoni pizza" --> ['pepperoni', 'pizza']
  let query = {
    headers: {
      'X-Access-Token': '0c8f1aa53d894030'
    },
    url: 'https://api.eatstreet.com/publicapi/v1/restaurant/search?method=both&pickup-radius=10&street-address=' + cityName  //"Search Restaurants"
  }
  request.get(query, (error, response, body) => {
    if (error) {
      console.log('ERROR GETTING eatstreet DATA');
    } else {
      var res = JSON.parse(body);
      var restaurants = res.restaurants;
      var namesAndKeys = [];
      restaurants.forEach( (restaurant) => {
        splitFood.forEach( (type) => {
          if (restaurant.foodTypes.includes(type)) {
            namesAndKeys.push({name: restaurant.name, location: restaurant.city, apiKey: restaurant.apiKey});
          }
        });
      });
      callback(namesAndKeys);
    }
  });
};


let getMenu = (apiKey, foodType, callback) => {
  let query = {
    headers: {
      'X-Access-Token': '0c8f1aa53d894030'
    },
    url: 'https://api.eatstreet.com/publicapi/v1/restaurant/' + apiKey + '/menu'  //"Restaurant Menu"
  }
  request.get(query, (error, response, body) => {
    if (error) {
      console.log('ERROR GETTING eatstreet DATA');
    } else {
      var res = JSON.parse(body);
      var menus = [];
      var splitFood = foodType.split(' '); //need to ignore punctuation: need to use REGEX?
      splitFood = cutCommas(splitFood);
      res.forEach( (menu) => {
        menu.items.forEach((item) => {
          var name = item.name.split(' ');
          var desc = [];
          if (item.description) {
            desc = item.description.split(' ');
          }
          var menuItem = desc.concat(name);
          menuItem = cutCommas(menuItem);
          var counter = 0;
          for (var i = 0; i < splitFood.length; i++) {
            if (menuItem.includes(splitFood[i])) {
              counter++;
            }
          }
          item.relevance = counter;
          if (item.relevance >= 1) {
            menus.push(item);
          }
        });
      });
      callback(menus);
    }
  });
};

let formattedMenu = (apiKey, foodType, callback) => {
  var formattedData = [];
  getMenu(apiKey, foodType, (data) => {
    if (data) {
      data.forEach( (menu) => {
        formattedData.push({name: menu.name, description: menu.description || menu.name, price: menu.basePrice, relevance: menu.relevance});
      });
      callback(formattedData);
    } else {
      console.log('failed to get menu data from getMenu function');
    }
  });
};

let menusByCity = (cityName, foodType, callback) => {
  // console.log('in menus by city')
  var menus = [];
  getNamesAndKeys(cityName, foodType, (restaurants) => {
    if (restaurants) {
      restaurants.forEach( (restaurant) => {
        formattedMenu(restaurant.apiKey, foodType,  (menu) => {
          if (menu) {
            menu.forEach( (item) => {
              console.log('in menus by city: item: '. item);
              var entry = {restaurant: restaurant.name, location: restaurant.location, item: item.name, description: item.description, price: item.price, relevance: item.relevance};
              menus.push(entry);
            });
            callback(menus);
          }
        });
      });
    }
  });
};


let cutCommas = (array) => {
  return array.map(word => {
    var noPunc = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    var cutStr = noPunc.replace(/\s{2,}/g,' ');
    return cutStr.charAt(0).toUpperCase() + cutStr.slice(1);
  });
};


module.exports.getNamesAndKeys = getNamesAndKeys;
module.exports.getMenu = getMenu;
module.exports.formattedMenu = formattedMenu;
module.exports.menusByCity = menusByCity;