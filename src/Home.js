import React, { Component } from 'react';
import './App.css';

class InitGameState extends Component {
    state={
      age: 6
    };
    handleChange = (e) =>{
      this.setState({
          age: e.target.value
      });
    };
    renderGame = () => {
        this.props.renderGame(this.state.age);
    };
    render(){
        return (
            <div className="init-game-overlay">
                <div className="init-game-content">
                    <label htmlFor="age">enter your age</label>
                    <input type="text" id="age" onChange={this.handleChange}/>
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
            renderFirstState: 18,
            showInput: false
        }
    }
    renderGame = (firstState) => {
        this.setState({
           renderFirstState: firstState
        });
        console.log('my age is', this.state.renderFirstState, firstState.value)
        // this.props.renderGame(this.state.renderFirstState)
    };

    enterAge = (age) => {
        this.setState({
            showInput: true,
            renderFirstState: age,
        });
    };
    render() {
    return (
      <div className="main scene">
          <img src="./images/logo.png" alt="" className="main-screen-logo"/>
          <img src="./images/astronaut.png" alt="astronaut" className='main-screen-astronaut'/>
          <button className="play-btn" onClick={this.enterAge}>Play</button>
          {/*<button className="play-btn" onClick={this.renderGame}>Play</button>*/}
          {
              this.state.showInput ?
                  <InitGameState renderGame={this.renderGame}/> :
                  ''
          }
      </div>
    );
    }
}

export default Home;
