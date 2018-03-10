import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './components/todo/index.js'

class App extends Component {
  render() {
    const name = '张三'
    const list = [1,2,3,4]
    const styleconfig
    return (
      // {/* <Todo/> */}
      
      <ul>
        {list.map((item, index) => {
          return <li key={index}>{item}</li>
        })}
      </ul>
    );
  }
}

export default App;
