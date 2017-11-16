const request = require('request');
const Promise = require('bluebird');

let getNamesAndKeys = (cityName, foodType) => {
  return new Promise(function(resolve, reject) {
    var splitFood = foodType.split(' '); // "pepperoni pizza" --> ['pepperoni', 'pizza']
    let query = {
      headers: {'X-Access-Token': '0c8f1aa53d894030'},
      url: 'https://api.eatstreet.com/publicapi/v1/restaurant/search?method=both&pickup-radius=10&street-address=' + cityName
    };
    request.get(query, (error, response, body) => {
      if (error) {
        reject(error);
        console.log('ERROR GETTING eatstreet DATA');
      } else {
        formatRestaurantData(body, splitFood).then(function(formattedData) {
          resolve(formattedData);
        });
      }
    });
  });
};

let formatRestaurantData = (body, searchedFood) => {
  return new Promise(function(resolve) {
    var res = JSON.parse(body);
    var restaurants = res.restaurants;
    var namesAndKeys = [];
    restaurants.forEach((restaurant) => {
      searchedFood.forEach((type) => {
        if (restaurant.foodTypes.includes(type)) {
          namesAndKeys.push({name: restaurant.name, location: restaurant.city, apiKey: restaurant.apiKey, address: restaurant.streetAddress});
        }
      });
    });
    resolve(namesAndKeys);
  });
};



let getMenu = (apiKey, foodType) => {
  return new Promise(function(resolve, reject) {
    let query = {
      headers: {'X-Access-Token': '0c8f1aa53d894030'},
      url: 'https://api.eatstreet.com/publicapi/v1/restaurant/' + apiKey + '/menu'
    };
    request.get(query, (error, response, body) => {
      if (error) {
        reject(error);
        console.log('ERROR GETTING eatstreet DATA');
      } else {
        var res = JSON.parse(body);
        var splitFood = cutCommas(foodType.split(' '));
        if (!res.error) { //see bottom for error message
          menusWithRelevance(res, splitFood).then(function(relevantMenus) {
            resolve(relevantMenus);
          });
        } else {
          setTimeout(function() {
            getMenu(apiKey, foodType).then(function(menu) {
              resolve(menu);
            });
          }, 1000);
        }
      }
    });
  });
};

let menusWithRelevance = (res, splitFood) => {
  return new Promise(function(resolve) {
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
        if (item.relevance === splitFood.length) {    //returns most relevant menu items
          menus.push(item);
        }
      });
    });
    resolve(menus);
  });
};



let formattedMenu = (apiKey, foodType) => {
  return new Promise(function(resolve) {
    var formattedData = [];
    getMenu(apiKey, foodType).then(function(allMenus) {
      allMenus.forEach((menu) => {
        formattedData.push({name: menu.name, description: menu.description || menu.name, price: menu.basePrice, relevance: menu.relevance});
      });
      resolve(formattedData);
    });
  });
};

let menusByCity = (cityName, foodType) => {
  return new Promise(function(resolve) {
    var menus = [];
    getNamesAndKeys(cityName, foodType).then(function(restaurants) {
      restaurants.forEach((restaurant) => {
        formattedMenu(restaurant.apiKey, foodType).then(function(menu) {
            menu.forEach((item) => {
              var entry = {restaurant: restaurant.name, location: restaurant.location, item: item.name, description: item.description, price: item.price, relevance: item.relevance, address: restaurant.address};
              menus.push(entry);
            });
        });
      });
    });
    setTimeout(function() {
      if (menus) {
        resolve(menus);
      }
    }, 1500);
  });
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


// let menusByCity = (cityName, miles, foodType, callback) => {
//   var menus = [];
//   getNamesAndKeys(cityName, miles, foodType, (restaurants) => {
//     if (restaurants) {
//       restaurants.forEach( (restaurant) => {
//         formattedMenu(restaurant.apiKey, foodType, (menu) => {
//           if (menu) {
//             menu.forEach( (item) => {
//               var entry = {restaurant: restaurant.name, location: restaurant.location, item: item.name, description: item.description, price: item.price, relevance: item.relevance};
//               menus.push(entry);
//             });
//           }
//         });
//       });
//     }
//   });
//   setTimeout(function() {
//     if (menus) {
//       callback(menus);
//     }
//   }, 2500);
// };

