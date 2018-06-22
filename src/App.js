import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Stars =(props) => {
    let stars =[];
    for (let i=0; i< props.NumberStars; i++){
        stars.push( <i key={i} className="fas fa-star"></i>)
    }
    return(
        <div className='col-md-5'>
            {stars}
        </div>
    )
}

const Button =(props) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button =<button className='btn btn-success'><i className='fa fa-check'></i></button>;
            break;
        case false:
            button = <button className='btn btn-danger'><i className='fa fa-times'></i></button>;
            break;
        default:
            button =  <button className='btn' onClick={props.checkAnswer} disabled={props.selectedNumbers.length === 0}>=</button>
    }
    return(
        <div className='col-md-2'>{button}</div>
    )
};

const Answer =(props) => {
    return(
        <div className='col-md-5'>
            {props.selectedNumbers.map((number, i) =>
            <span key={i} onClick={() => props.unselectNumber(number)} >{number}</span>
            )}
        </div>
    )
};

const Numbers = (props) => {
    const numberClassName= (number)=>{
        if (props.selectedNumbers.indexOf(number) >= 0) {return 'selected'}
    };

    return(
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, i) =>
                    <span key={i} className={numberClassName(number)}
                          onClick={() => props.selectNumber(number)}>
                        {number}
                        </span>
                )}
            </div>
        </div>
    )
};

Numbers.list = [1,2,3,4,5,6,7,8,9];

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedNumbers: [],
            randomNumberofStars: 1 + Math.floor(Math.random()*9),
            answerIsCorrect: null
        }
    }
    checkAnswer = () => {
      this.setState(prevState => ({
          answerIsCorrect: prevState.randomNumberofStars ===
              prevState.selectedNumbers.reduce((acc, n) => acc +n, 0)
      }));
    };
    acceptAnswer = () => {

    };
    selectNumber = (clickedNumber) =>{
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return;}
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }))
    };

    unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
        }));
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h3>Play nine</h3>
                    <hr/>
                    <Stars NumberStars={this.state.randomNumberofStars} />
                    <Button selectedNumbers={this.state.selectedNumbers} answerIsCorrect={this.state.answerIsCorrect} checkAnswer={this.checkAnswer}/>
                    <Answer selectedNumbers={this.state.selectedNumbers} unselectNumber={this.unselectNumber}/>
                </div>
                <Numbers selectedNumbers={this.state.selectedNumbers} selectNumber={this.selectNumber}/>
            </div>
        )
    }
}

class App extends Component {
  render() {
    return (
      <div className="App">
          <Game />
      </div>
    );
  }
}

export default App;
