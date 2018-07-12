import React, { Component } from 'react';
import './App.css';

class InitGameState extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            age: 6,
            render: false
        };
    };

    handleChange = (e) =>{
        this.setState({
            age: e.target.value,
            render: true

        });
    };
    renderGame = (e) => {
        e.preventDefault();
        if (this.state.render) {
            this.props.renderGame(this.state.age);
            //console.log('test meee', this.state.age);
        }
    };
    render(){
        return (
            <div className="init-game-overlay">
                <div className="init-game-content">
                    <label htmlFor="age">enter your age</label>
                    <form action="" onSubmit={this.renderGame}>
                        <input type="text" id="age" onChange={this.handleChange}/>
                        <button>go to first level</button>
                    </form>
                </div>
            </div>
        )
    }
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            renderFirstState: 0,
            showInput: false
        }
        this.renderGame = this.renderGame.bind(this);
    }
    renderGame = (firstState) => {
        this.setState({
           renderFirstState: firstState
        }, () => {
            this.props.renderGame(this.state.renderFirstState)
        });
        console.log('my age is', firstState)
        //this.props.renderGame(this.state.renderFirstState)
    };

    enterAge = () => {
        this.setState({
            showInput: true
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
