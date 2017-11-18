const request = require('request');
// const config = require('../config.js');

//"Search Restaurants" endpoint: https://developers.eatstreet.com/endpoint/search
let getNamesAndKeys = (location, foodType, callback) => {
  var splitFood = foodType.split(' ');
  let query = {
    headers: {'X-Access-Token': process.env.key},
    url: 'https://api.eatstreet.com/publicapi/v1/restaurant/search?method=both&pickup-radius=10&street-address=' + location
  };
  request.get(query, (error, response, body) => {
    if (error) {
      console.log('ERROR GETTING eatstreet DATA');
    } else {
      var formattedData = formatRestaurantData(body, splitFood);
      callback(formattedData);
    }
  });
};

//Takes body response from getNamesAndKeys and gets restaurant name, location, apiKey (unique restraurant ID), and restaurant address
let formatRestaurantData = (body, searchedFood) => {
  var res = JSON.parse(body);
  var restaurants = res.restaurants;
  var namesAndKeys = [];
  restaurants.forEach( (restaurant) => {
    searchedFood.forEach( (type) => {
      if (restaurant.foodTypes.includes(type)) {
        namesAndKeys.push({name: restaurant.name, location: restaurant.city, apiKey: restaurant.apiKey, address: restaurant.streetAddress, logo: restaurant.logoUrl});
      }
    });
  });
  return namesAndKeys;
};


//Gets menu items from "Restaurant Menu" endpoint: https://developers.eatstreet.com/endpoint/restaurant-menu
let getMenu = (apiKey, foodType, callback) => {
  let query = {
    headers: {'X-Access-Token': process.env.key},
    url: 'https://api.eatstreet.com/publicapi/v1/restaurant/' + apiKey + '/menu'
  };
  request.get(query, (error, response, body) => {
    if (error) {
      console.log('ERROR GETTING eatstreet DATA');
    } else {
      var res = JSON.parse(body);
      var splitFood = cutCommas(foodType.split(' '));
      if (!res.error) {
        menusWithRelevance(res, splitFood, function(data) {
          if (data) {
            callback(data);
          }
        });
      } else {
        setTimeout(function() {
          getMenu(apiKey, foodType, function(data) {
            if (data) {
              callback(data);
            }
          });
        }, 1000); //Can only make 10 requests/second otherwise throws error
      }
    }
  });
};

//Adds "relevance" property to menu items
//Only menus items with exact matches are returned
//ex - search for "Pepperoni Pizza" will only return menu item names or item descriptions that include words "Pepperoni" and "Pizza"
let menusWithRelevance = (res, splitFood, callback) => {
  var menus = [];
  res.forEach((menu) => {
    menu.items.forEach((item) => {
      var name = item.name.split(' ');
      var desc = [];
      if (item.description) {
        desc = item.description.split(' ');
      }
      var menuItem = cutCommas(desc.concat(name));
      var counter = 0;
      for (var i = 0; i < splitFood.length; i++) {
        if (menuItem.includes(splitFood[i])) {
          counter++;
        }
      }
      item.relevance = counter;
      if (item.relevance === splitFood.length) {
        menus.push(item);
      }
    });
  });
  callback(menus);
};


//Extracts menu item name, menu item description (if present, otherwise set to item name), price, and relevance
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


//Calls all functions above to retrieve all relevant menu items within 10 miles of provided location/city.
let menusByCity = (cityName, foodType, callback) => {
  var menus = [];
  getNamesAndKeys(cityName, foodType, (restaurants) => {
    if (restaurants) {
      restaurants.forEach((restaurant) => {
        formattedMenu(restaurant.apiKey, foodType, (menu) => {
          if (menu) {
            menu.forEach( (item) => {
              var entry = {restaurant: restaurant.name, location: restaurant.location, item: item.name, description: item.description, price: item.price, relevance: item.relevance, address: restaurant.address, logo: restaurant.logo};
              menus.push(entry);
            });
          }
        });
      });
    }
  });
  setTimeout(function() {
    if (menus) {
      var groupByRestaurant = [];
      var restaurantNames = [];
      menus.forEach(menu => {
        if (restaurantNames.includes(menu.restaurant)) {
          for (var i = 0; i < groupByRestaurant.length; i++) {
            if (groupByRestaurant[i].name === menu.restaurant) {
              groupByRestaurant[i].items.push({
                'item' : menu.item,
                'description': menu.description,
                'price': menu.price
              });
            }
          }
        } else {
          restaurantNames.push(menu.restaurant);
          var restaurantObj = {
              'name': menu.restaurant,
              'items': [],
              'address': menu.address,
              'location': menu.location,
              'logo': menu.logo
            };
            restaurantObj.items.push({
              'item': menu.item,
              'description': menu.description,
              'price': menu.price
            });
            groupByRestaurant.push(restaurantObj);
        }
      });
    };
    if (groupByRestaurant.length > 0) {
      callback(groupByRestaurant);
    } else {
      //groupByRestaurant[0] = 'no data';
      //console.log('groupByRestaurant: ', groupByRestaurant);
      callback({});
    }
  }, 2500);
};


let cutCommas = (array) => {
  return array.map(word => {
    var noPunc = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    var cutStr = noPunc.replace(/\s{2,}/g, '');
    return cutStr.charAt(0).toUpperCase() + cutStr.slice(1);
  });
};



module.exports.getNamesAndKeys = getNamesAndKeys;
module.exports.getMenu = getMenu;
module.exports.formattedMenu = formattedMenu;
module.exports.menusByCity = menusByCity;



///BOTH FUNCTIONS BELOW TAKE USER SEARCH RADIUS

// let getNamesAndKeys = (cityName, miles, foodType, callback) => {
//   var splitFood = foodType.split(' '); // "pepperoni pizza" --> ['pepperoni', 'pizza']
//   let query = {
//     headers: {'X-Access-Token': '0c8f1aa53d894030'},
//     url: 'https://api.eatstreet.com/publicapi/v1/restaurant/search?method=both&pickup-radius=' + miles + '&street-address=' + cityName
//   };
//   request.get(query, (error, response, body) => {
//     if (error) {
//       console.log('ERROR GETTING eatstreet DATA');
//     } else {
//       var formattedData = formatRestaurantData(body, splitFood);
//       callback(formattedData);
//     }
//   });
// };