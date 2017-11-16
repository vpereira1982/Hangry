const React = require('react');
const ReactDOM = require('react-dom');
const Result = require('./result.jsx');
const SortList = require('./sort-list.jsx');

const ResultsList = (props) => (
  <div className="container">
    <div style={{'marginTop': '30px'}} >
      <h3> Eat Your Food: </h3>

      <SortList sortList={props.sortList} />
      {props.list.map((result, i) => {
        return (<Result key={Math.abs(Math.random())} result={result} sortList={props.sortList} />);
      })};
    </div>
  </div>
);

module.exports = ResultsList;
