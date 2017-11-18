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
        <div className="row">
          <div className="col col-md-12">
            <h5 onClick={this.handleClick} className="btn btn-danger" style={{float: 'left', margin: '-25px 0 10px 0'}}>{this.props.result.name}</h5>
          </div>
        </div>
        <div className="row card-block card" style={{paddingTop: '7px'}}>
          <div className="col col-md-12 text-center">
            <img className="rounded float-left" src={this.props.result.logo}></img>

            <p className="lead">
              <h2>{this.props.result.items[0].item}</h2>
            </p>
            <div className="row justify-content-md-center">
              <p className="text-justify" style={{maxWidth: '80%'}}>
                <i>{this.props.result.items[0].description}</i>
              </p>
            </div>
              <div className="row justify-content-md-center">
                <p className="text-justify" style={{maxWidth: '80%'}}>
                  <strong>Address: </strong>
                  {this.props.result.address} ({this.props.result.location})
                </p>
              </div>

              <div className="row justify-content-md-center">
                <p className="text-justify" style={{maxWidth: '80%'}}>
                  <strong>Price: </strong>
                  ${this.props.result.items[0].price}
                </p>
              </div>
            {this.props.result.items.length - 1 > 0
              ? <div className="row col offset-2 button-menu-cstm">
                    <button type="button" className="btn btn-warning btn-sm text-justify" onClick={() => this.setState({showItems: !this.state.showItems})}>
                      <strong>Click for {this.props.result.items.slice(1).length} more {this.props.result.items.slice(1).length > 1 ? 'items!' : 'item!'}</strong>
                    </button>
                </div>
              : null
            }
                {this.state.showItems
                  ? this.props.result.items.slice(1).map(item => {
                      return (
                        <div className="row col offset-5">
                          <div className="extra-items">
                            <p></p>
                            <p><strong>Item:</strong> {item.item}</p>
                            <p style={{maxWidth: item.description.length > 100 ? '80%' : '100%' }} ><i>{item.description}</i></p>
                            <p><strong>Price:</strong> {item.price}</p>
                            <p></p>
                        </div>
                      </div>
                      )
                    })
                  : null}
            </div>

        </div>
      </div>
    )
  }
}

module.exports = Result;
