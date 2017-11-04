const React = require('react');
const ReactDOM = require('react-dom');
const Result = require('./result.jsx');

class ResultsList extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
        console.log('this is the list', this.props.list)

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
