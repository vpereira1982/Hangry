const React = require('react');
const ReactDOM = require('react-dom');

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showItems: false
    };
  }

  handleClick(e) {
    this.props.sortList('name', this.props.result.name);
  }

  render() {
    return (
      <div className="jumbotron Col xs={12} md={6}">
        <h5 onClick={this.handleClick} className="btn btn-danger" style={{float: 'left', margin: '-25px 0 10px 0'}}>{this.props.result.name}</h5>
        <div className="card-block card w-100 text-center" style={{paddingTop: '7px'}}>
          <p className="lead">
            <h2>{this.props.result.items[0].item}</h2>
          </p>
          <div className="row justify-content-md-center">
            <p className="text-justify" style={{maxWidth: '80%'}}>
              <i>{this.props.result.items[0].description}</i>
            </p>
          </div>
          <h6>
            <p><strong>Location:</strong> {this.props.result.location}</p>
          </h6>
          <h6>
            <p><strong>Address:</strong> {this.props.result.address}</p>
          </h6>
          <h6>
            <p><strong>Price:</strong> ${this.props.result.items[0].price}</p>
          </h6>
          <h6>
            <p onClick={() => this.setState({showItems: !this.state.showItems})}>
              <strong>Click here for {this.props.result.items.slice(1).length} more items!</strong>
            </p>
          </h6>
            {this.state.showItems
              ? this.props.result.items.slice(1).map(item => {
                  return (
                    <div className="extra-items">
                      <p></p>
                      <p><strong>Item:</strong> {item.item}</p>
                      <p><i>{item.description}</i></p>
                      <p><strong>Price:</strong> {item.price}</p>
                      <p></p>
                    </div>
                  )
                })
              : null}
        </div>
      </div>
    )
  }
}

module.exports = Result;
