import {useEffect, useState} from 'react';
import './progress-bar.css';

function ProgressBar(props) {

    return (
        <div className='progress-bar-div'>
            <div className='progress-bar'>
                <div className='progress-bar__background'></div>
                <div className='progress-bar__progress' style={{background: props.color_font, width: props.progress+'%'}}></div>
            </div>
            <div className='progress-bar__text'>
                <p style={{color: props.color_text}}>{props.current_value}/{props.max_value}</p>
            </div>
        </div>
    );
}

export default ProgressBar;