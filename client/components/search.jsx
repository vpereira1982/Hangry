const React = require('react');

const Search = () => (
  <form className="form-inline" id="search-boxes">
    <label className="sr-only" for="inlineFormInput">Name</label>
    <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Search Your Food" />

    <label className="sr-only" for="inlineFormInputGroup">Search Your Location</label>
    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
      <div className="input-group-addon">@</div>
      <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Username" />
    </div>
    <button type="submit" className="btn btn-primary">Get Your Hangry On</button>
  </form>
);

module.exports = Search;
