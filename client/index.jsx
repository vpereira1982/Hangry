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
        <header>
          <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-indigo">
            <a class="navbar-brand" href="#"><strong>Hangry Home</strong></a>
          </nav>
        </header>
        <p>homeboys and home girls</p>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
