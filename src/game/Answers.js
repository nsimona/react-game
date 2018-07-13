import React, { Component } from 'react';
let _ = require('lodash');

const Answer =(props) => {
    return(
        <div className='answer-container'>
            {props.selectedNumbers.map((number, i) =>
                <span className="number" key={i} onClick={() => props.unselectNumber(number)} >{number}</span>
            )}
        </div>
    )
};


export default Answer;
