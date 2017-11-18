const React = require('react');
const ReactDOM = require('react-dom');

const SortList = ({sortList, list, handleClick}) => (
  <div className="row no-gutters" id="sort-dropdown">
    <div className="btn-group btn-sort">
      <button type="button" className="dropdown-toggle no-gutters" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Sort
        <span className="caret"></span>
      </button>
      <ul className="dropdown-menu">
        <li>
          <a href="#" id='price' onClick={handleClick}>
            Price</a>
        </li>
        <li>
          <a href="#" id='relevance' onClick={handleClick}>
            Relevance</a>
        </li>
      </ul>
    </div>
  </div>
);

module.exports = SortList;
