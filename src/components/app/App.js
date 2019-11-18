import React, { Component } from 'react';
import './App.css';

import Grid from '../grid';
import Ships from '../ships';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid />
        <Ships />
      </div>
    );
  }
}

export default App;
