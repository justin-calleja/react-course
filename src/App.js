import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    count: 0
  };

  handleClick(e) {
    e.persist();
    this.setState({ event: e });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>+</button>
        <pre>{this.state.event ? this.state.event.type : null}</pre>
      </div>
    );
  }
}

export default App;
