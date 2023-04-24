import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './mission.css'
import ProgressBar from '../progress-bar/progress-bar';

function Mission(props) {
    const [currentValue, setCurrentValue] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isComplete, setIsComplete] = useState(false);
    const [color, setColor] = useState('#5952de');
    const [colorText, setColorText] = useState('black');

    useEffect(() => {
        getCurrentValue();
    }, [props.mission]);

    function getCurrentValue() {
        fetch(props.url+'/api/getProgress/'+props.user.id+'/'+props.mission.callback)
            .then((res) => res.json())
            .then((data) => { 
                setCurrentValue(data.count);
                calculateProgress();
            })
    }

    function calculateProgress() {
        if(currentValue < props.mission.max_value) {
            let progress = (currentValue * 100) / props.mission.max_value;
            progress = Math.trunc(progress);
            setProgress(progress);
            setIsLoading(false);
        } else {
            setProgress(100);
            setColor('green');
            setColorText('green');
            setIsComplete(true);
            setIsLoading(false);
        }
    }

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <div className="mission">
                <div className="mission__title">
                    <h2>{props.mission.name}</h2>
                    <p>{props.mission.description}</p>
                    <ProgressBar progress={progress} current_value={currentValue} max_value={props.mission.max_value} color_font={color} color_text={colorText}/>
                </div>
            </div>
        </>
    );
}

export default Mission;
