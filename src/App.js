import React, { Component } from 'react';
import './App.css';

// bit.ly/s-pcs
var possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize);
    for (var i = 1; i < combinationsCount ; i++ ) {
        var combinationSum = 0;
        for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};

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
            button =<button className='btn btn-success' onClick={props.acceptAnswer}><i className='fa fa-check'></i></button>;
            break;
        case false:
            button = <button className='btn btn-danger'><i className='fa fa-times'></i></button>;
            break;
        default:
            button =  <button className='btn' onClick={props.checkAnswer} disabled={props.selectedNumbers.length === 0}>=</button>
    }
    return(
        <div className='col-md-2 text-center'>
            {button}
            <br /><br />
            <button className= 'btn btn-warning btn-sm' onClick={props.redraw} disabled={props.redraws===0}>
                <i className="fas fa-sync-alt"></i>
                <strong style={{marginLeft: 10}}>{props.redraws}</strong>
            </button>
            </div>
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
        if (props.usedNumbers.indexOf(number) >= 0) {return 'used'}
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

const Done = (props) =>{
    return (
        <div className='text-center'>
            <h2>{props.doneStatus}</h2>
            <button className="btn btn-secondary" onClick={props.resetGame}>Play again!</button>
        </div>
    )
};

class Game extends Component {
    static randomNumber = () =>  1 + Math.floor(Math.random()*9);
    static initState = () => ({
        selectedNumbers: [],
        randomNumberofStars: Game.randomNumber(),
        usedNumbers: [],
        answerIsCorrect: null,
        redraws: 5,
        doneStatus: ''
    });
    state = Game.initState();
    resetGame = () => this.setState(Game.initState());
    checkAnswer = () => {
      this.setState(prevState => ({
          answerIsCorrect: prevState.randomNumberofStars ===
              prevState.selectedNumbers.reduce((acc, n) => acc +n, 0)
      }));
    };
    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberofStars: Game.randomNumber()
        }), this.updateDoneStatus);
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
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber),
            randomNumberofStars: Game.randomNumber()
        }), this.updateDoneStatus);
    };

    redraw = () => {
        if(this.state.redraws === 0){return;}
            this.setState(prevState => ({
                randomNumberofStars: Game.randomNumber(),
                answerIsCorrect: null,
                selectedNumbers: [],
                redraws: prevState.redraws - 1
            }), this.updateDoneStatus);
    };

    possibleSolutions = ({randomNumberofStars, usedNumbers}) => {
        const possibleNumbers = [1,2,3,4,5,6,7,8,9].filter( number =>
            usedNumbers.indexOf(number) === -1
        );
        return possibleCombinationSum(possibleNumbers, randomNumberofStars);
    };

    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'You rule!' };
            }
            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: 'Game Over!' };
            }
        });
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h3>Play nine</h3>
                    <hr/>
                    <Stars NumberStars={this.state.randomNumberofStars} />
                    <Button selectedNumbers={this.state.selectedNumbers}
                            answerIsCorrect={this.state.answerIsCorrect}
                            checkAnswer={this.checkAnswer}
                            acceptAnswer = {this.acceptAnswer}
                            redraw={this.redraw}
                            redraws={this.state.redraws}
                    />
                    <Answer selectedNumbers={this.state.selectedNumbers} unselectNumber={this.unselectNumber}/>
                </div>
                {
                    this.state.doneStatus ?
                        <Done doneStatus={this.state.doneStatus} resetGame={this.resetGame}/> :
                        <Numbers selectedNumbers={this.state.selectedNumbers} selectNumber={this.selectNumber} usedNumbers ={this.state.usedNumbers}/>
                }


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
