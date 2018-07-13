import React, { Component } from 'react';
let _ = require('lodash');

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
                {console.log(this.props.randomStars)}
                {this.renderStars()}
            </div>
        )
    }
}

export default Stars;
