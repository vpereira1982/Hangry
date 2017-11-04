const React = require('react');
const ReactDOM = require('react-dom');

class Result extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h5>This is a result</h5>
        <p>{this.props.result}</p>
      </div>
    )
  }
}

module.exports = Result;