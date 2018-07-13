import React, { Component } from 'react';
let _ = require('lodash');


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


export default Button;
