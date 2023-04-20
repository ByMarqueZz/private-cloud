import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Popover from '@mui/material/Popover';
import './popover.css';

function PopoverOption(props) {
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
                            props.sendModal(props.file, props.type);
                        }}>Compartir</p>
                    </div>
                    <div className='option-popOver'>
                        <p className='option-popOver-p' onClick={() => {
                            setAnchorEl(null);
                            props.download(props.path, props.file, 'private', props.type);
                        }}>Descargar</p>
                    </div>
                    <div className='option-popOver'>
                        <p className='option-popOver-p' onClick={() => {
                            if(props.file.password) {
                                props.showPass3(props.file, props.type);
                            } else {
                                props.renameModal(props.file, props.type);
                            }
                            setAnchorEl(null);
                        }}>Editar</p>
                    </div>
                    <div className='option-popOver'>
                        <p className='option-popOver-p' onClick={() => {
                            setAnchorEl(null);
                            props.modalDelete(props.file.name, props.type);
                        }}>Borrar</p>
                    </div>
                </div>
            </Popover>
        </div>
    );
}

export default PopoverOption;
