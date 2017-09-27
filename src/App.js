import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started Fuck you ce faci mai boule, edit <code>src/App.js</code> and save to reload.
        </p>
        <button className="btn btn-default"> Buna</button>
        <ul class="fa-ul">
        <li><i class="fa-li fa fa-check-square"></i>List icons</li>
        <li><i class="fa-li fa fa-check-square"></i>can be used</li>
        <li><i class="fa-li fa fa-spinner fa-spin"></i>as bullets</li>
        <li><i class="fa-li fa fa-square"></i>in lists</li>
      </ul>
      </div>
    );
  }
}

export default App;
