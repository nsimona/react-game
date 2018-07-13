import React, { Component } from 'react';
import Stars from './game/Stars';
import Numbers from './game/Numbers';
import Button from './game/Buttons';
import Answer from './game/Answers';
import Status from './game/Status';
// import Menu from './Menu';
let _ = require('lodash');

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

class Game extends Component {
    static randomNumber = (number) =>  1 + Math.floor(Math.random() * number);
    static initState = (initstars) => ({
        randomStars: initstars || 0,
        selectedNumbers: [],
        usedNumbers: [],
        answerIsCorrect: null,
        redraws: initstars - 3 || 0,
        levelStars: initstars || 0,
        endLevel: false,
        doneStatus: false,
        renderGame: false,
        listNumber:  _.range(1, initstars + 1) || 0
    });
    constructor(props){
        super(props);
        this.initStars = Number(this.props.initStars);
        this.state = Game.initState();
    }
    componentDidMount() {
        this.setState(Game.initState(this.initStars));
    }
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
        }), this.updateStatus);
    };
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
        }), this.updateStatus);
    };
    redraw = () => {
        if(this.state.redraws === 0){return;}
        this.setState(prevState => ({
            randomStars: Game.randomNumber(prevState.levelStars),
            answerIsCorrect: null,
            selectedNumbers: [],
            redraws: prevState.redraws - 1
        }), this.updateStatus);
    };
    possibleSolutions = ({randomStars, usedNumbers}) => {
        const possibleNumbers = [1,2,3,4,5,6,7,8,9].filter( number =>
            usedNumbers.indexOf(number) === -1
        );
        return possibleCombinationSum(possibleNumbers, randomStars);
    };
    updateStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === this.state.levelStars) {
                return {doneStatus: true, endLevel: true}
            }
            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return {doneStatus: false, endLevel: true}
            }
        });
    };

    resetGame = () => this.setState(Game.initState(this.initStars));

    nextLevel = () => {
        if (this.state.levelStars >= 30){return;}
        this.setState(prevState => ({
            randomStars: Game.randomNumber(Number(prevState.levelStars) + 3),
            selectedNumbers: [],
            usedNumbers: [],
            answerIsCorrect: null,
            redraws: Number(prevState.levelStars) + 3 - (Math.trunc((Number(prevState.levelStars)) / 3) + 2),
            levelStars: Number(prevState.levelStars) + 1 + 3,
            doneStatus: '',
            endLevel: false,
            listNumber:  _.range(1, (Number(prevState.levelStars) + 4) )
        }));
    };

    render() {
        let status = '';
        const {
            randomStars,
            listNumber,
            selectedNumbers,
            answerIsCorrect,
            endLevel,
            usedNumbers,
            redraws,
            doneStatus
        } = this.state;
        if (endLevel) {
            status = <Status doneStatus={doneStatus} resetGame={this.resetGame} nextLevel={this.nextLevel}/>;
        }
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
                        {/*<button className='btn btn-warning' onClick={this.resetGame}>reset</button>*/}
                        {/*<button className='btn btn-info' onClick={this.nextLevel}>go to next level</button>*/}
                    </div>
                <Numbers listNumber={listNumber} selectNumber={this.selectNumber} selectedNumbers={selectedNumbers} usedNumbers={usedNumbers}/>
                {status}
            </div>
        )
    }
}

export default Game;
