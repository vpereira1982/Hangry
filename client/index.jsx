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
      example: 'placeholder'
    };
  }

  render() {
    return (
      <div>
        <Nav />
        <Search />
        <ResultsList list={Sampledata} />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
