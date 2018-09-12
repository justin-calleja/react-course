import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    value: 0,
    count: 0,
    visible: true
  };

  handleClick = () => {
    this.setState(prevState => ({ count: prevState.count + prevState.value }));
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({ value: +value });
  };

  handleKeyDown = event => {
    if (event.key === "Enter") {
      return this.handleClick();
    }
  };

  handleVisibilityClick = () => {
    this.setState(({ visible }) => ({ visible: !visible }));
  };

  render() {
    const { count, visible, value } = this.state;
    return (
      <div className="App">
        <button onClick={this.handleClick}>+</button>
        <input
          type="number"
          value={value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <button onClick={this.handleVisibilityClick}>
          {visible ? "Hide" : "Show"}
        </button>
        {visible ? <div>Count is {count}</div> : null}
      </div>
    );
  }
}

export default App;
