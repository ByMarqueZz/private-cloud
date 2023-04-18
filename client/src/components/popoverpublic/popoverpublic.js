import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Popover from '@mui/material/Popover';

function PopoverPublic(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className='options-files-home'>
            <img className='options-files-home' src='/assets/options.png' aria-describedby={id} variant="contained" onClick={handleClick}></img>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <div className='options-PopOver'>
                    <div className='option-popOver'>
                        <p className='option-popOver-p' onClick={() => {
                            setAnchorEl(null);
                            props.download(props.path, props.file, 'public', props.type);
                        }}>Descargar</p>
                    </div>
                </div>
            </Popover>
        </div>
    );
}

export default PopoverPublic;
