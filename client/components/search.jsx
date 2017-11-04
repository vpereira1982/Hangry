const React = require('react');

const Search = () => (
  <form className="form-inline" id="search-boxes">
    <div clss="form-group">
      <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Search Your Food" />
    </div>
    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
      <div className="input-group-addon">Location</div>
      <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Where are you" />
    </div>
    <button type="submit" className="btn btn-primary">Get Your Hangry On</button>
  </form>
);

module.exports = Search;
