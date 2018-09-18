import React, { Component } from "react";
import tippy from "tippy.js";
import axios from "axios";
import NProgress from "nprogress";
import "./App.css";

class StopWatch extends Component {
  state = {
    time: 0
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(state => ({
        time: state.time + 1
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return <div>{this.state.time}s</div>;
  }
}

class Repos extends Component {
  state = {
    repos: null
  };

  componentDidMount() {
    this.fetchRepos();
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevProps.org !== this.props.org) {
  //     this.setState({ repos: null });
  //     this.fetchRepos();
  //   }
  // }

  fetchRepos = async () => {
    NProgress.start();
    try {
      const response = await axios.get(
        `https://api.github.com/orgs/${this.props.org}/repos`
      );
      this.setState({ repos: response.data });
    } catch (err) {
      console.error(err.message);
    }
    NProgress.done();
  };

  render() {
    const { repos } = this.state;
    return (
      <ul>
        {repos
          ? repos.map(repo => (
              <li key={repo.id}>
                <a target="_blank" href={repo.html_url}>
                  {repo.name}
                </a>{" "}
              </li>
            ))
          : null}
      </ul>
    );
  }
}

class App extends Component {
  state = {
    selectedOrg: null,
    stopwatchMounted: true
  };

  componentDidMount() {
    tippy(".hello");
  }

  handleMount = () => this.setState({ stopwatchMounted: true });

  handleUnmount = () => this.setState({ stopwatchMounted: false });

  handleOrgChange = event => {
    this.setState({
      selectedOrg: event.target.value
    });
  };

  render() {
    const { stopwatchMounted, selectedOrg } = this.state;
    return (
      <div className="App">
        {stopwatchMounted ? <StopWatch /> : null}
        <button onClick={this.handleMount}>Mount StopWatch</button>
        <button onClick={this.handleUnmount}>Unmount StopWatch</button>
        <div title="hello tippy!" className="hello">
          Hover over me!
        </div>
        <div>
          <label htmlFor="facebook">Facebook</label>
          <input
            id="facebook"
            type="radio"
            value="facebook"
            checked={this.state.selectedOrg === "facebook"}
            onChange={this.handleOrgChange}
          />
        </div>
        <div>
          <label htmlFor="node">Node.js</label>
          <input
            id="nodejs"
            type="radio"
            value="nodejs"
            checked={this.state.selectedOrg === "nodejs"}
            onChange={this.handleOrgChange}
          />
        </div>
        {selectedOrg ? <Repos key={selectedOrg} org={selectedOrg} /> : null}
      </div>
    );
  }
}

export default App;
