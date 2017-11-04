const React = require('react');
const ReactDOM = require('react-dom');

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.details = this.props.result;
  }

  render() {
    return (
      <div className="jumbotron Col xs={12} md={6}">
        <h5>{this.details.restaurant}</h5>
        <p>{this.details.item}</p>
        <p>{this.details.description}</p>
        <p>{this.details.location}</p>
        <p><h7><strong>Price:</strong> {this.details.price}</h7></p>
      </div>
    )
  }
}

module.exports = Result;