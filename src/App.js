import './App.css';

import React, { Component } from 'react'
import News from './components/News';
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  apiKey = process.env.REACT_APP_API_KEY;

  state = {
    progress: 0
  }

  setProgress = (progress)=>{
    this.setState({
      progress: progress
    })
  }

  render() {
    return (
      <>
        <LoadingBar
        waitingTime={200}
        height={3}
        color='#f11946'
        progress={this.state.progress}
      />
        <Navbar/>
        <News country="us" pageSize="15" category="sports" setProgress = {this.setProgress} apiKey = {this.apiKey}/>
      </>
    )
  }
}

