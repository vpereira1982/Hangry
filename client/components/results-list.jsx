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
      <div style={{'marginTop': '50px', float: 'left'}} >

      <h3> Results list: </h3>
      {this.props.list.map((result, i) => {
        return (<Result key={i} result={result} />);
      })};
    </div>
    )
  }
}

module.exports = ResultsList;
