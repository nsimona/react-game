import React, { Component } from 'react';
import './App.css';

class InitGameState extends Component {
    state={
      age: ''
    };
    handleChange = (e) =>{
      this.setState({
          age: e.target.value
      })
    };
    renderGame = () => {
        this.props.initStars(this.state.age);
    };
    render(){
        return (
            <div className="init-game-overlay">
                <div className="init-game-content">
                    <label htmlFor="age">enter your age</label>
                    <input type="text" id="age" value={this.state.age} onChange={this.handleChange}/>
                    <button onClick={this.renderGame}>go to first level</button>
                </div>
            </div>
        )
    }
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            renderFirstState: '',
            showInput: false
        }
    }
    renderGame = () =>{
       return this.props.renderGame;
    };
    enterAge = () => {
        this.setState({
            showInput: true
        });
    };
    initStars = (starsNumber) => {
        this.setState({
           renderFirstState: starsNumber
        });
        console.log(this.state.renderFirstState);
    };
    render() {
    return (
      <div className="main scene">
          <img src="./images/logo.png" alt="" className="main-screen-logo"/>
          <img src="./images/astronaut.png" alt="astronaut" className='main-screen-astronaut'/>
          <button className="play-btn" onClick={this.enterAge}>Play</button>
          {
              this.state.showInput ?
                  <InitGameState initStars={this.initStars} renderGame={this.renderGame}/> :
                  ''
          }
      </div>
    );
    }
}

export default Home;
