import React, { Component } from 'react';
import './App.css';
import Home from './Home';
var _ = require('lodash');
// bit.ly/s-pcs
let possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    let listSize = arr.length, combinationsCount = (1 << listSize);
    for (let i = 1; i < combinationsCount ; i++ ) {
        let combinationSum = 0;
        for (let j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};

class Stars extends Component {
    renderStars = () => {
        let stars =[];
        for (let i=0; i< this.props.randomStars; i++){
            let star = _.random(1, 9);
            stars.push(<img key={i} src={`images/stars/${star}.png`} alt={`star ${star}`}/>)
        }
        return stars;
    };
    render () {
        return(
            <div className="stars-container">
                {this.renderStars()}
            </div>
        )
    }
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
    //let btnState; danger, warning
    return(
        <div className='buttons-container'>
            <button className='btn btn-lg'>=</button>
            <button className= 'btn btn-info'>
                <i className="fas fa-sync-alt"></i>
                <strong style={{marginLeft: 10}}>5</strong>
            </button>
            </div>
    )
};

const Answer =(props) => {
    return(
        <div className='col-md-5'>
            {props.selectedNumbers.map((number, i) =>
            <span className="number" key={i} /*onClick={() => props.unselectNumber(number)}*/ >{number}</span>
            )}
        </div>
    )
};

const Numbers = (props) => {
    // const numberClassName= (number)=>{
    //     if (props.selectedNumbers.indexOf(number) >= 0) {return 'selected'}
    //     if (props.usedNumbers.indexOf(number) >= 0) {return 'used'}
    // };

    return(
        <div className="numbers-container">
            <div>
                {props.listNumber.map((number, i) =>
                    <span className="number"
                          key={i} /*className={numberClassName(number)}*/
                          onClick={() => props.selectNumber(number)}>
                        {number}
                        </span>
                )}
            </div>
        </div>
    )
};

const Done = (props) =>{
    return (
        <div className='text-center'>
            <h2>{props.doneStatus}</h2>
            <button className="btn btn-secondary" onClick={props.resetGame}>Play again!</button>
        </div>
    )
};
class Timer extends Component {
    constructor() {
        super();
        this.state = { time: {}, seconds: 180 };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }

    startTimer() {
        if (this.timer == 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds == 0) {
            clearInterval(this.timer);
        }
    }
    render() {
      return (
        <div className="timer-container">
            <button onClick={this.startTimer}>Star</button>
            {this.state.time.m}:{this.state.time.s}
        </div>
      )
    }
};

class Game extends Component {
    static randomNumber = () =>  1 + Math.floor(Math.random() * 9);
    static initState = () => ({
        randomStars: Game.randomNumber(),
        selectedNumbers: [],
        usedNumbers: [],
        answerIsCorrect: null,
        redraws: 5,
        levelStars: 9,
        doneStatus: '',
        renderGame: false,
        listNumber:  _.range(1,10)
    });
    state = Game.initState();
    resetGame = () => this.setState(Game.initState());
    checkAnswer = () => {
      this.setState(prevState => ({
          answerIsCorrect: prevState.randomStars ===
              prevState.selectedNumbers.reduce((acc, n) => acc +n, 0)
      }));
    };
    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            randomStars: Game.randomNumber()
        }), this.updateDoneStatus);
    };
    selectNumber = (clickedNumber) =>{
        //if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return;}
        this.setState(prevState => ({
            //answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }))
    };

    unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber),
            randomStars: Game.randomNumber()
        }), this.updateDoneStatus);
    };

    redraw = () => {
        if(this.state.redraws === 0){return;}
            this.setState(prevState => ({
                randomStars: Game.randomNumber(),
                answerIsCorrect: null,
                selectedNumbers: [],
                redraws: prevState.redraws - 1
            }), this.updateDoneStatus);
    };

    possibleSolutions = ({randomStars, usedNumbers}) => {
        const possibleNumbers = [1,2,3,4,5,6,7,8,9].filter( number =>
            usedNumbers.indexOf(number) === -1
        );
        return possibleCombinationSum(possibleNumbers, randomStars);
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
    renderGame = () => {
        this.setState({
            renderGame: true
        })
    };

    render() {
        const {
            randomStars,
            listNumber,
            selectedNumbers,
            levelStars
        } = this.state;
        return (
            <div className="scene inner-scene">
                    <img src="./images/logo.png" alt="" className="main-screen-logo"/>
                    <Timer />
                    <div className="game-container">
                        <Stars randomStars={randomStars}/>
                        <Button selectedNumbers={selectedNumbers}
                                //answerIsCorrect={this.state.answerIsCorrect}
                                // checkAnswer={this.checkAnswer}
                                // acceptAnswer = {this.acceptAnswer}
                                // redraw={this.redraw}
                                // redraws={this.state.redraws}
                        />
                        <Answer selectedNumbers={selectedNumbers}/>
                        <div className="cf"></div>
                        {/*<p>How many stars do you see? Count the stars and lickc the number or sum of numbers that represents the stars.</p>*/}
                        <Numbers listNumber={listNumber} selectNumber={this.selectNumber}/>
                    </div>
                {/*{*/}
                    {/*this.state.doneStatus ?*/}
                        {/*<Done doneStatus={this.state.doneStatus} resetGame={this.resetGame}/> :*/}
                        {/*<Numbers selectedNumbers={this.state.selectedNumbers} selectNumber={this.selectNumber} usedNumbers ={this.state.usedNumbers}/>*/}
                {/*}*/}

            </div>
        )
    }
}

export default Game;
