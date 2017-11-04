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


let getMenu = (apiKey, callback) => {
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
      res.forEach( (item) => {
        menus.push(item.items);
      });
      callback(menus);
    }
  });
};

let formattedMenu = (apiKey, callback) => {
  var formattedData = [];
  getMenu(apiKey, (data) => {
    if (data) {
      data.forEach( (menu) => {
        menu.forEach( (item) => {
          formattedData.push({name: item.name, description: item.description || item.name, price: item.basePrice});
        });
      });
      callback(formattedData);
    } else {
      console.log('failed to get menu data from getMenu function');
    }
  });
};

let menusByCity = (cityName, foodType, callback) => {
  var menus = [];
  getNamesAndKeys(cityName, foodType, (restaurants) => {
    if (restaurants) {
      restaurants.forEach( (restaurant) => {
        formattedMenu(restaurant.apiKey, (menu) => {
          if (menu) {
            menu.forEach( (item) => {
              var entry = {restaurant: restaurant.name, location: restaurant.location, item: item.name, description: item.description, price: item.price};
              menus.push(entry);
            });
            callback(menus);
          }
        });
      });
    }
  });
};

module.exports.getNamesAndKeys = getNamesAndKeys;
module.exports.getMenu = getMenu;
module.exports.formattedMenu = formattedMenu;
module.exports.menusByCity = menusByCity;