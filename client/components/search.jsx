const React = require('react');
let query = {};

const Search = ({handleSearch}) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleSearch(query);
    }}
    className="form-inline"
    id="search-boxes">
    {console.log('this is the search form', handleSearch)}
    <div clss="form-group">
      <input
        onChange={(e) => {query.search = e.target.value; }}
        type="text"
        className="form-control mb-2 mr-sm-2 mb-sm-0"
        id="inlineFormInput"
        placeholder="Search Your Food" />
    </div>
    <div className="input-group mb-2 mr-sm-2 mb-sm-0">
      <div className="input-group-addon">Location</div>
      <input
        type="text"
        onChange={(e) => {query.location = e.target.value; }}

        className="form-control"
        id="inlineFormInputGroup"
        placeholder="Where are you" />
    </div>
    <button type="submit" className="btn btn-primary">Get Your Hangry On</button>
  </form>
);

module.exports = Search;
