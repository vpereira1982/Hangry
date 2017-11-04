const React = require('react');
const ReactDOM = require('react-dom');

class Result extends React.Component {
  constructor(props) {

  }

  render() {
    return (
      <h5>This is a result</h5>
      <p>{this.props.result}</p>
    )
  }
}

module.exports = Result;