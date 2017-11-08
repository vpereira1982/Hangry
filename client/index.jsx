const Nav = require('./components/nav.jsx');
const Search = require('./components/search.jsx');
// const ResultsList = require('./components/results-list.jsx');
// const Sampledata = require('./sampledata/sampledata.js');
const React = require('react');
const ReactDom = require('react-dom');
const $ = require('jquery');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currFoodSearched: '',
      currLocationSearched: ''
    };
  }

  handleFoodUserSearch(searchTerm) {
    this.setState({
      currFoodSearched: searchTerm.target.value
    });
  }

  handleLocationUserSearch(searchTerm) {
    this.setState({
      currLocationSearched: searchTerm.target.value
    });
  }

  handleSubmit(foodUserSearch, locationUserSearch) {
    let currentSearchTermsObj = {
      currFoodSearched: this.state.curre,
      currLocationSearched: ''
    };

    console.log('on form submit heres my object being saved and passed to the server', currentSearchTermsObj);

    $.ajax({
      method: 'POST',
      url: '/searchResults',
      data: currentSearchTermsObj,
    }).done(function(data) {
      console.log('data on the client thats already came back from the server', data);
    });
  }

  render() {
    return (
      <div>
        <Nav />
        <Search
          currFoodSearched={this.state.currFoodSearched}
          currLocationSearched={this.state.currLocationSearched}
          handleFoodUserSearch={this.handleFoodUserSearch.bind(this)}
          handleLocationUserSearch={this.handleLocationUserSearch.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        />
        <div className="container">
          {/* <ResultsList list={this.state.list} /> */}
        </div>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
