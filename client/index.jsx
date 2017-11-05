const Nav = require('./components/nav.jsx');
const Search = require('./components/search.jsx');
const ResultsList = require('./components/results-list.jsx');
const Sampledata = require('./sampledata/sampledata.js')
const React = require('react');
const ReactDom = require('react-dom');
const $ = ('jquery');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ''
    };
  }

  handleSearch(query) {
    let searchFoodInput = query.target.value;
    console.log();
    console.log('this is the search query', query)
    $.ajax({
      method: "POST",
      url: "http://localhost:3000" + '/' + query,
      contentType: 'application/json',
      success: function(data) {
        console.log('received data!');
        this.setState({
          list: data
        });
      },
      error: function() {
        console.log('API call failed!')
      }
    }).bind(this);
  }

  render() {
    return (
      <div>
        <Nav />
        <Search handleSearch={this.handleSearch.bind(this)} />
        <div className="container">
          <ResultsList list={this.state.list} />
        </div>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
