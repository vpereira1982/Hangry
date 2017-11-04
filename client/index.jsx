const Nav = require('./dist/components/nav.jsx');
const Search = require('./dist/components/search.jsx');
const ResultsList = require('./dist/components/results-list.jsx');

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
        <ResultsList list={['placeholder', 'placeholder', 'placeholder', 'placeholder', ]} />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
