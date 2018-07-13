import React, { Component } from 'react';
let _ = require('lodash');

class Status extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: 'hmm, how did you get here?',
            btnMsg: 'hm, why do you see this button?'
        }
        this.btnAction = this.btnAction.bind(this);
    }
    componentDidMount() {
      this.generateButtons();
    };
    static success = () => ({
            message: 'Yeyy, you did it!',
            btnMsg: 'Go to next level'
    });
    static fail = () => ({
            message: 'You failed :( Game over!',
            btnMsg: 'Play again!'
    });

    generateButtons = () => {
        if (this.props.doneStatus) {
            this.setState(Status.success());
        }  else {
            this.setState(Status.fail());
        }
    };
    btnAction = () => {
        if (this.props.doneStatus) {
            return this.props.nextLevel()
        } else {
            return this.props.resetGame()
        }
    };
    render() {
        let status = (
            <div className="done-status-content">
                <h2>{this.state.message}</h2>
                <button className="btn btn-success" onClick={this.btnAction}>{this.state.btnMsg}</button>
            </div>);
        return(
            <div className='done-status text-center'>
                {status}
            </div>
        )
    }
}
export default Status;
