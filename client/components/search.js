const React = require('react');

const Search = ({currFoodSearched, currLocationSearched, handleFoodUserSearch, handleLocationUserSearch, handleSubmit}) => (
  <div className="container">
    <form
      onSubmit={(event) => { event.preventDefault(); handleSubmit(currFoodSearched, currLocationSearched); }}
      className="form-inline container"
      id="search-boxes">
      <img className="img-responsive text-center" id="main-food-pic" src="img/restaurant-icon.png" />
      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
        <div className="input-group-addon">Food</div>
        <input
          onChange={handleFoodUserSearch}
          type="text"
          className="form-control mb-2 mr-sm-2 mb-sm-0"
          id="inlineFormInput"
          placeholder="Search Your Food" />
      </div>
      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
        <div className="input-group-addon">Location</div>
        <input
          type="text"
          onChange={handleLocationUserSearch}
          className="form-control"
          id="inlineFormInputGroup"
          placeholder="Where are you?" />
      </div>
      <button type="submit" className="btn btn-primary">Be Full . Be Happy</button>
    </form>
  </div>
);

module.exports = Search;
