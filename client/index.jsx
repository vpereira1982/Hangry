const Nav = require('./components/nav.js');
const Search = require('./components/search.js');
const ResultsList = require('./components/results-list.js');
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
      list: [],
      showItems: false
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
      if (!Array.isArray(data)) {
        alert('Sorry, we are working on expanding our menu. Please try something else.');
      }
      console.log('SUCCESS on the POST call! Data:', data);
      this.setState({
        list: data.slice(0, 20)
      });
    });
  }

  sortList(type, value) {
    let list = this.state.list;

    if (type === 'price') {
      this.setState({
        list: list.sort((a, b) => {
          return a.items[0].price - b.items[0].price;
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
  }

  handleClick(e) {
    this.sortList(e.target.id);
  }

  sortHandleClick(e) {
    this.props.sortList('name', this.props.result.name);
  }

  setShowItems() {
    this.setState({
      showItems: !this.state.showItems
    });
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
          handleSubmit={this.handleSubmit.bind(this)}
        />
        <ResultsList
          sortList={this.sortList.bind(this)}
          list={this.state.list}
          handleClick={this.handleClick.bind(this)}
          sortHandleClick={this.sortHandleClick.bind(this)}
          showItems={this.state.showItems}
          setShowItems={this.setShowItems.bind(this)}
        />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
