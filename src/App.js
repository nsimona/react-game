import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import Game from './Game';


class App extends Component {
    state ={
        renderGame: false,
        initialStars: 8
    };

    renderGame = stars => {
        this.setState({
            initialStars: stars,
            renderGame: true

        });
        console.log('stars are', this.state.initialStars, 'should be', stars);
    };
    render() {
        return (
          <div className="App">
              {
                  this.state.renderGame ?
                      <Game initStars={this.state.initialStars}/> :
                      <Home renderGame={this.renderGame}/>
              }
          </div>
        );
    }
}

export default App;
