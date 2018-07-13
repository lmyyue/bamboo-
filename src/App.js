import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TabMenu from './Components/TabMenu';
import Sentiment from './Components/Sentiment';
import Panel from './Components/Panel';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>*/}
        <Panel><TabMenu /></Panel>
        <Panel><Sentiment a='20' b='30' c='50' /></Panel>
      </div>
    );
  }
}

export default App;
