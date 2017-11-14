const React = require('react');
const ReactDOM = require('react-dom');
const Result = require('./result.jsx');

const ResultsList = ({list}) => (
  <div className="container">
    <div style={{'marginTop': '50px', float: 'left'}} >
      <h3> Eat Your Food: </h3>
      {list.map((result, i) => {
        return (<Result key={Math.abs(Math.random())} result={result} />);
      })};
    </div>
  </div>
);

module.exports = ResultsList;
