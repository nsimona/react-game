import React, { Component } from 'react';
let _ = require('lodash');

const Numbers = (props) => {
    const numberClassName= (number)=>{
        if (props.selectedNumbers.indexOf(number) >= 0) {return 'selected'}
        if (props.usedNumbers.indexOf(number) >= 0) {return 'used'}
    };

    return (
        <div className="numbers-container">
            <div>
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
export default Numbers;
