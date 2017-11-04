const React = require('react');
const ReactDom = require('react-dom');
const $ = ('jquery');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      example: 'placeholder'
    }
  }


  render() {
    return (
      <div>
        homeboys and home girls
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById("app"));
