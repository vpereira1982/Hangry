const React = require('react');
const ReactDOM = require('react-dom');
const Result = require('./result.jsx');

class ResultsList extends React.Component {
  constructor(props) {
    super(pros);

  }

  render() {
    return (
      <div>
      <h3> This is the body of Results List </h3>

        {this.props.list.map((result, i) => {
          return (<Result key={i} result={result} />);
        })};

    </div>
    )
  }
}

module.exports = ResultsList;
