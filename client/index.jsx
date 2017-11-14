const Nav = require('./components/nav.jsx');
const Search = require('./components/search.jsx');
const ResultsList = require('./components/results-list.jsx');
const Sampledata = require('./sampledata/sampledata.js');
const HangryLogo = require('./components/logo-file.js');
const APIcall = require('./components/ajax.js')
const React = require('react');
const ReactDom = require('react-dom');
const $ = require('jquery');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currFoodSearched: '',
      currLocationSearched: '',
      list: Sampledata
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

    let self = this;

    APIcall.post(userQuery, '/api/search', (data) => {
      console.log('SUCCESS on the POST call! Data:', data);
      this.setState({
        list: data
      })
    });
    // why .bind(this) does not work?
  }

  render() {
        console.log('what is this showing?', this.state.list)

    return (
      <div>
        <Nav />
        <HangryLogo />
        <Search
          currFoodSearched={this.state.currFoodSearched}
          currLocationSearched={this.state.currLocationSearched}
          handleFoodUserSearch={this.handleFoodUserSearch.bind(this)}
          handleLocationUserSearch={this.handleLocationUserSearch.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        />
        <ResultsList list={this.state.list} />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
