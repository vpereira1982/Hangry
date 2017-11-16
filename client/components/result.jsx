const React = require('react');
const ReactDOM = require('react-dom');

const Result = (props) => {
  let details = props.result;


  const handleClick = (e) => {
    props.sortList('name', details.restaurant);
  }

  return (
    <div className="jumbotron Col xs={12} md={6}">
      <h5 onClick={handleClick} className="btn btn-danger" style={{float: 'left', margin: '-25px 0 10px 0'}}>{details.restaurant}</h5>
      <div className="card-block card w-100 text-center" style={{paddingTop: '7px'}}>
        <p className="lead"><h2>{details.item}</h2></p>
        <div className="row justify-content-md-center">
          <p className="text-justify" style={{maxWidth: '80%'}}><strong>Description:</strong> {details.description}</p>
        </div>
        <h6>
          <p><strong>Location:</strong> {details.location}</p>
        </h6>
        <h6>
          <p><strong>Address:</strong> {details.address}</p>
        </h6>
        <h6>
          <p><strong>Price:</strong> ${details.price}</p>
        </h6>
      </div>
    </div>
  )
}

module.exports = Result;
