import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import Game from './Game';


class App extends Component {
    state ={
        renderGame: false
    };
    renderGame = () => {
        this.setState({
            renderGame: true
        });
    };
    render() {
        return (
          <div className="App">
              <Game/>
              {/*{*/}
                  {/*this.state.renderGame ?*/}
                      {/*<Game/> :*/}
                      {/*<Home renderGame={this.renderGame}/>*/}
              {/*}*/}
          </div>
        );
    }
}

export default App;
