const SortList = require('./sort-list.js');

const React = require('react');
const ReactDOM = require('react-dom');

const Result = ({sortHandleClick, showItems, result, setShowItems}) => (<div className="jumbotron Col xs={12} md={6}">
  <div className="row">
    <div className="col col-md-12">
      <h5 onClick={sortHandleClick} className="btn btn-danger" id="restaurant-name">
        {result.name}
      </h5>
    </div>
  </div>
  <div className="row card-block card" id="second">
    <div className="col col-md-12 text-center">
      <img className="rounded float-left logo" src={result.logo}></img>
      <div className="lead">
        <h2>{result.items[0].item}</h2>
      </div>
      <div className="row justify-content-md-center">
        <p className="text-justify" style={{
          maxWidth: '80%'
        }}>
          <i>{result.items[0].description}</i>
        </p>
      </div>
      <div className="row justify-content-md-center">
        <p className="text-justify" style={{
          maxWidth: '80%'
        }}>
          <strong>Address:
          </strong>
          {' ' + result.address}
          ({result.location})
        </p>
      </div>

      <div className="row justify-content-md-center">
        <p className="text-justify" style={{
          maxWidth: '80%'
        }}>
          <strong>Price:
          </strong>
          {' $' + result.items[0].price}
        </p>
      </div>
      {
        result.items.length - 1 > 0
          ? <div className="row col offset-2 button-menu-cstm">
            <button type="button" className="btn btn-warning btn-sm text-justify" onClick={() => setShowItems()}>
              <strong>Click for {result.items.slice(1).length}
                {' more'}
                {
                  result.items.slice(1).length > 1
                    ? 'items!'
                    : 'item!'
                }</strong>
            </button>
          </div>
          : null
      }
      {
        showItems
          ? result.items.slice(1).map(item => {
            return (<div className="row col offset-5">
              <div className="extra-items">
                <p>
                  <strong>Item:
                  </strong>
                  {item.item}</p>
                <p style={{
                  maxWidth: item.description.length > 100
                    ? '80%'
                    : '100%'
                }}>
                  <i>{item.description}</i>
                </p>
                <p>
                  <strong>Price:</strong>
                  {' $' + item.price}</p>
              </div>
            </div>);
          })
          : null
      }
    </div>
  </div>
</div>);

module.exports = Result;
