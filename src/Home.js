import React, { Component } from 'react';
import './App.css';

class Home extends Component {
    renderGame = () =>{
       this.props.renderGame()
    };
    render() {
    return (
      <div className="main scene">
          <img src="./images/logo.png" alt="" className="main-screen-logo"/>
          <img src="./images/astronaut.png" alt="astronaut" className='main-screen-astronaut'/>
          <button className="play-btn" onClick={this.renderGame}>Play</button>
      </div>
    );
    }
}

export default Home;
