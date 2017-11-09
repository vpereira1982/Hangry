const React = require('react');

const Search = ({currFoodSearched, currLocationSearched, handleFoodUserSearch, handleLocationUserSearch, handleSubmit}) => (
  <form
    onSubmit={() => { handleSubmit(currFoodSearched, currLocationSearched); }}
    className="form-inline container"
    id="search-boxes">
    <img className="img-responsive text-center" id="main-food-pic" src="img/restaurant-icon.png" />
    <div className="form-group">
      <input
        onChange={handleFoodUserSearch}

        type="text"
        className="form-control mb-2 mr-sm-2 mb-sm-0"
        id="inlineFormInput"
        placeholder="Search Your Food" />
      {console.log('User typing food letter by letter', currFoodSearched)}
    </div>
    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
      <div className="input-group-addon">Location</div>
      <input
        type="text"
        onChange={handleLocationUserSearch}
        className="form-control"
        id="inlineFormInputGroup"
        placeholder="Where are you" />
      {console.log('User typing location letter by letter', currLocationSearched)}
    </div>
    <button type="submit" className="btn btn-primary">Get Your Hangry On</button>
  </form>
);

module.exports = Search;
