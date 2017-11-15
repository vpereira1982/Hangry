const React = require('react');
const ReactDOM = require('react-dom');

const Result = (props) => {
  var details = props.result;

    return (
      <div className="jumbotron Col xs={12} md={6}">
        <h5 className="btn btn-danger" style={{float: 'left', margin: '-25px 0 10px 0'}}>{details.restaurant}</h5>
        <div className="card-block card w-100 text-center" style={{paddingTop: '7px'}}>
          <p className="lead">{details.item}</p>
          <div className="row justify-content-md-center">
            <p className="text-justify" style={{maxWidth: '80%'}}>{details.description}</p>
          </div>
          <h6>
            <p><strong>Location:</strong> {details.location}</p>
          </h6>
          <h6>
            <p><strong>Price:</strong> ${details.price}</p>
          </h6>
        </div>
      </div>
    )
}

module.exports = Result;
