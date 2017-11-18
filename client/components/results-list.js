const React = require('react');
const ReactDOM = require('react-dom');

const Result = require('./result.js');
const SortList = require('./sort-list.js');
const UserMessage = require('./user-message.js');

const ResultsList = ({sortList, list}) => (
  list.length > 0
    ? <div className="container">
      <div id="eat-food-title">
        <h3>Eat Your Food</h3>
        <SortList sortList={sortList} />
        {list.map((result, i) => {
          return (<Result
            key={Math.abs(Math.random())}
            result={result}
            sortList={sortList}
          />);
        })};
      </div>
    </div>
    : <UserMessage />
);

module.exports = ResultsList;
