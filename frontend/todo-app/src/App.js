import React, { Component } from 'react';
import FirstComponent from './components/learning-examples/FirstComponent.jsx'
import SecondComponent from './components/learning-examples/SecondComponent.jsx'
import ThirdComponent from './components/learning-examples/ThirdComponent.jsx'
import Counter from './components/counter/Counter.jsx'
// import logo from './logo.svg';
import './App.css';
 
class App extends Component {
  render() {
    return (
      <div className="App">
        <Counter/>
      </div>
    )
  }
}

class LearningComponents extends Component {
  render() {
    return (
      <div className="LearningComponents">
        Learning Components!
        <FirstComponent></FirstComponent>
        <SecondComponent></SecondComponent>
        <ThirdComponent></ThirdComponent>
      </div>
    )
  }
}
export default App
