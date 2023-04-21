import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './mission.css'
import LinearProgress from '../linear-progress/linear-progress';

function Mission(props) {
    const [isCompleted, setIsCompleted] = useState(false);

    return (
        <>
            <div className="mission">
                <div className="mission__title">
                    <h2>{props.mission.name}</h2>
                    <p>{props.mission.description}</p>
                    <LinearProgress progress={0} maxValueProgress={1}/>
                </div>
            </div>
        </>
    );
}

export default Mission;
