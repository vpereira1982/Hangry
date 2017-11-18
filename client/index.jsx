const Nav = require('./components/nav.jsx');
const Search = require('./components/search.jsx');
const ResultsList = require('./components/results-list.jsx');
const Sampledata = require('./sampledata/sampledata.js');
const HangryLogo = require('./components/logo-file.js');
const APIcall = require('./components/ajax.js');
const React = require('react');
const ReactDom = require('react-dom');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currFoodSearched: '',
      currLocationSearched: '',
      list: []
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
    let userQuery = {
      query: foodUserSearch,
      location: locationUserSearch
    };


    APIcall.post(userQuery, '/api/search', (data) => {
      console.log('SUCCESS on the POST call! Data:', data);
      this.setState({
        list: data.slice(0, 20)
      });
    });
  }

  sortList(type, value) {
    if (type === 'price') {
      this.setState({
        list: this.state.list.sort((a, b) => {
          return a.price - b.price;
        })
      });
    }

    if (type === 'relevance') {
      this.setState({
        list: this.state.list.sort((a, b) => {
          return a.relevance - b.relevance;
        })
      });
    }

    if (type === 'name') {
      console.log('it got here!', value);
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <HangryLogo />
        <Search
          currFoodSearched={this.state.currFoodSearched}
          currLocationSearched={this.state.currLocationSearched}
          handleFoodUserSearch={this.handleFoodUserSearch.bind(this)}
          handleLocationUserSearch={this.handleLocationUserSearch.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}/>
        <ResultsList sortList={this.sortList.bind(this)} list={this.state.list} />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
