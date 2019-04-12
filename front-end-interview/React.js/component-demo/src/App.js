import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Component1 from './component/component1';

class App extends Component {

  reducer(props, state, action) {
    let payload = action.payload || {};

    switch (action.type) {
      case 'init':
      case 'refesh':
      case 'cancel':
      case 'show':
      case 'reset':
        return {
          ...state,
          selected: 0
        }
      case 'select':
        return {
          ...state,
          selected: props.selected ? 1 : 0
        }
      default:
        return state;
    }
  }

  onselect(payload) {
    console.log('payload', payload);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Component1 reducer={this.reducer} onselect={this.onselect}/>
        </header>
      </div>
    );
  }
}

export default App;
