import React, { Component } from 'react';

class InitGame extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            age: 6
        };
    };

    handleChange = (e) =>{
        this.setState({
            age: e.target.value
        });
    };
    renderGame = (e) => {
        e.preventDefault();
        this.props.renderGame(this.state.age);
    };
    render(){
        return (
            <div className="init-game-overlay">
                <div className="init-game-content">
                    <form onSubmit={this.renderGame}>
                        <label htmlFor="age">enter your age</label>
                        <input type="text" id="age" onChange={this.handleChange}/>
                        <button className="btn btn-success">go to first level</button>
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
            age: 0,
            showInput: false
        };
        this.initGame = this.initGame.bind(this);
    }
    initGame = (initState) => {
        this.setState({
           age: initState
        }, () => this.props.renderGame(this.state.age));
    };
    enterAge = () => {
        this.setState({
            showForm: true
        });
    };
    render() {
        let agePopup = '';
        if(this.state.showForm) {
            agePopup = <InitGame renderGame={this.initGame}/>;
        }
        return (
          <div className="main scene">
              <img src="./images/logo.png" alt="" className="main-screen-logo"/>
              <img src="./images/astronaut.png" alt="astronaut" className='main-screen-astronaut'/>
              <button className="play-btn" onClick={this.enterAge}>Play</button>
              {agePopup}
          </div>
        );
    }
}

export default Home;
