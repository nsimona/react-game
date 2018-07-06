import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import Game from './Game';


class App extends Component {
    state ={
        renderGame: false,
        initialStars: 0
    };

    initGame= (stars) => {
        this.setState({
            initialStars: stars
        })
    };

    renderGame = () => {
        console.log(this.state.renderGame);
        this.setState({
            renderGame: true
        });
    };
    render() {
        return (
          <div className="App">
              {/*<Game/>*/}
              {
                  this.state.renderGame ?
                      <Game initalStars={this.state.initialStars}/> :
                      <Home renderGame={this.renderGame} initGame={this.initGame}/>
              }
          </div>
        );
    }
}

export default App;
