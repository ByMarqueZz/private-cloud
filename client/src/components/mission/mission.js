import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './mission.css'
import LinearProgress from '../linear-progress/linear-progress';

function Mission(props) {
    const [currentValue, setCurrentValue] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        getCurrentValue();
        setTimeout(() => {getCurrentValue()}, 1000);
    }, [props.mission]);

    function getCurrentValue() {
        fetch(props.url+'/api/getProgress/'+props.user.id+'/'+props.mission.callback)
            .then((res) => res.json())
            .then((data) => { 
                setCurrentValue(data.count);
                calculateProgress();
                setIsLoading(false);
            })
    }

    function calculateProgress() {
        if(currentValue < props.mission.max_value) {
            let progress = (currentValue * 100) / props.mission.max_value;
            progress = Math.trunc(progress);
            setProgress(progress);
        } else {
            setProgress(100);
            setIsComplete(true);

        }
    }

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <div className="mission">
                <div className="mission__title">
                    <h2>{props.mission.name}</h2>
                    <p>{props.mission.description}</p>
                    <LinearProgress progress={progress} current_value={currentValue} max_value={props.mission.max_value}/>
                </div>
            </div>
        </>
    );
}

export default Mission;
