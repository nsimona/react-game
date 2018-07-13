import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import Game from './Game';
// import Menu from './Menu';


class App extends Component {
    state ={
        renderGame: false,
        initStars: 3
    };

    renderGame = stars => {
        this.setState({
            initStars: stars,
            renderGame: true
        });
    };

    render() {
        // let play = <Home renderGame={this.renderGame}/>;
        // if(this.state.renderGame && this.state.initStars >= 6) {
        //     play = <Game initStars={this.state.initStars}/>;
        // }

        //for dev env
        let play = <Game initStars={this.state.initStars}/>
        return (
          <div className="App">
              {play}
          </div>
        );
    }
}

export default App;
