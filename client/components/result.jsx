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
        <h5 className="btn btn-danger" style={{float: 'left', margin: '-25px 0 10px 0'}}>{this.details.restaurant}</h5>
        <div className="card-block card w-100 text-center" style={{paddingTop: '7px'}}>
          <p className="lead">{this.details.item}</p>
          <div className="row justify-content-md-center">
            <p className="text-justify" style={{maxWidth: '80%'}}>{this.details.description}</p>
          </div>
          <p><h7><strong>Location:</strong> {this.details.location}</h7></p>
          <p><h7><strong>Price:</strong> ${this.details.price}</h7></p>
        </div>
      </div>
    )
  }
}

module.exports = Result;