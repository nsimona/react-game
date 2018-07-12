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
    shouldComponentUpdate(nextProps) {
        return this.props.randomStars !== nextProps.randomStars;
    };
    renderStars = () => {
        let stars =[];
        for (let i=0; i< this.props.randomStars ; i++){
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
            button =  <button className='btn' onClick={props.checkAnswer} disabled={props.selectedNumbers.length === 0} style={{color: '#000'}}>=</button>
    }
    let btnState={
        danger: 'danger',
        warning: 'warning',
        info: 'info'
    };
    let btnClass = () =>{
        if(props.redraws > 2){
            return btnState.info;
        }
        if(props.redraws === 2){
            return btnState.warning;
        }
        if(props.redraws <= 1){
            return btnState.danger;
        }
    }
    // ; danger, warning, btn-info
    return(
        <div className='buttons-container'>
            <div>
                {button}
                <button className={`btn btn-${btnClass()}`} onClick={props.redraw}>
                    <i className="fas fa-sync-alt"></i>
                    <strong style={{marginLeft: 10}}>{props.redraws}</strong>
                </button>
            </div>
        </div>
    )
};

const Answer =(props) => {
    return(
        <div className='answer-container'>
            {props.selectedNumbers.map((number, i) =>
            <span className="number" key={i} onClick={() => props.unselectNumber(number)} >{number}</span>
            )}
        </div>
    )
};

const Numbers = (props) => {
    const numberClassName= (number)=>{
        if (props.selectedNumbers.indexOf(number) >= 0) {return 'selected'}
        if (props.usedNumbers.indexOf(number) >= 0) {return 'used'}
    };

    return (
        <div className="numbers-container">
            <div>
                {console.log(props.listNumber)}
                {props.listNumber.map((number, i) =>
                <span
                key={i} className ={`number ${numberClassName(number)}`}
                onClick={() => props.usedNumbers.indexOf(number) >= 0 ? false : props.selectNumber(number)}>
                {number}
                </span>
                )}
            </div>
        </div>
    )
};

const Done = (props) =>{
    return (
        <div className='done-status text-center'>
            <div className="done-status-content">
                <h2>{props.doneStatus}</h2>
                <button className="btn btn-warning pull-left" onClick={props.resetGame}>Play again [from ZERO level]!</button>
                <button className="btn btn-success pull-right" onClick={props.resetGame}>Go to next level -></button>
            </div>
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
    static randomNumber = (number) =>  1 + Math.floor(Math.random() * number);
    // let initStars = this.props.initStars;
    // static initState = () => ({
    //     randomStars: Game.randomNumber(this.props.initStars),
    //     selectedNumbers: [],
    //     usedNumbers: [],
    //     answerIsCorrect: null,
    //     redraws: this.props.initStars - 3,
    //     levelStars: this.props.initStars,
    //     doneStatus: '',
    //     renderGame: false,
    //     listNumber:  _.range(1,this.props.initStars+1)
    // });
    // state = Game.initState();

    constructor(props){
        super(props);
        this.state={
            randomStars: 0,
            selectedNumbers: [],
            usedNumbers: [],
            answerIsCorrect: null,
            redraws: 0,
            levelStars: 0,
            doneStatus: '',
            renderGame: false,
            listNumber: []
        }
    }
    componentDidMount() {

        //console.log('lodash array',_.range(1, Number(this.props.initStars + 1)) );
        this.initGame(this.props.initStars);
    }
    initGame = (initStars) => {
        let starsInc = Number(initStars)  + 1 ;
        this.setState({
            randomStars: Game.randomNumber(initStars),
            selectedNumbers: [],
            usedNumbers: [],
            answerIsCorrect: null,
            redraws: initStars - 3,
            levelStars: initStars,
            doneStatus: '',
            renderGame: false,
            listNumber:  _.range(1, starsInc)
        })
    };
    // resetGame = () => this.setState({
    //     randomStars: Game.randomNumber(this.props.initStars),
    //     selectedNumbers: [],
    //     usedNumbers: [],
    //     answerIsCorrect: null,
    //     redraws: this.props.initStars - 3,
    //     levelStars: this.props.initStars,
    //     doneStatus: '',
    //     renderGame: false,
    //     listNumber:  _.range(1,this.props.initStars+1)
    // });
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
            randomStars: Game.randomNumber(prevState.levelStars)
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
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
        }), this.updateDoneStatus);
    };

    redraw = () => {
        if(this.state.redraws === 0){return;}
            this.setState(prevState => ({
                randomStars: Game.randomNumber(prevState.levelStars),
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
            if (prevState.usedNumbers.length === this.state.levelStars) {
                return { doneStatus: 'You passed the level!' };
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
    nextLevel = () => {
        if (this.state.levelStars >= 30){return;}
        console.log('before',this.state.listNumber);
        this.setState(prevState => ({
            randomStars: Game.randomNumber(prevState.levelStars + 3),
            selectedNumbers: [],
            usedNumbers: [],
            answerIsCorrect: null,
            redraws: Number(prevState.levelStars) + 3 - (Math.trunc((Number(prevState.levelStars)) / 3) + 2),
            levelStars: Number(prevState.levelStars) + 1 + 3,
            doneStatus: '',
            listNumber:  _.range(1, (Number(prevState.levelStars) + 4) )
        }));
        console.log('after',this.state.listNumber);
    };

    render() {
        const {
            randomStars,
            listNumber,
            selectedNumbers,
            answerIsCorrect,
            usedNumbers,
            redraws,
            doneStatus
        } = this.state;
        return (
            <div className="scene inner-scene">
                    <img src="./images/logo.png" alt="" className="main-screen-logo"/>
                    {/*<Timer />*/}
                    <div className="game-container">
                        <Stars randomStars={randomStars}/>
                        <Button selectedNumbers={selectedNumbers}
                                answerIsCorrect={answerIsCorrect}
                                checkAnswer={this.checkAnswer}
                                acceptAnswer = {this.acceptAnswer}
                                redraw={this.redraw}
                                redraws={redraws}
                        />
                        <Answer selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber}/>
                        <div className="cf">&nbsp;</div>
                        <button className='btn btn-info' onClick={this.nextLevel}>go to next level</button>
                    </div>
                <Numbers listNumber={listNumber} selectNumber={this.selectNumber} selectedNumbers={selectedNumbers} usedNumbers={usedNumbers}/>
                {doneStatus ? <Done doneStatus={doneStatus} resetGame={this.resetGame}/> : ''}
            </div>
        )
    }
}

export default Game;
