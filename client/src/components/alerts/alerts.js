import Alert from '@mui/material/Alert';

function Alerts(props) {

    return (
        <>
            {
                props.sendSuccess ? <div className='alert-success'><Alert severity="success">Enviado correctamente</Alert></div> : ''
            }
            {
                props.createFolderSuccess ? <div className='alert-success'><Alert severity="success">Creado correctamente</Alert></div> : ''
            }
            {
                props.deleteSuccess ? <div className='alert-success'><Alert severity="success">Eliminado correctamente</Alert></div> : ''
            }
            {
                props.renameSuccess ? <div className='alert-success'><Alert severity="success">Renombrado correctamente</Alert></div> : ''
            }
            {
                props.uploadSuccess ? <div className='alert-success'><Alert severity="success">Subido correctamente</Alert></div> : ''
            }
            {
                props.downloadSuccess ? <div className='alert-success'><Alert severity="success">Descargado correctamente</Alert></div> : ''
            }
            {
                props.createFileSuccess ? <div className='alert-success'><Alert severity="success">Creado correctamente</Alert></div> : ''
            }
            {
                props.levelUp == false ? <div className='alert-success'><Alert severity="success">¡Enhorabuena has subido al nivel {props.newLevelUp}!</Alert></div> : ''
            }
            {
                props.maxSize ? <div className='alert-success'><Alert severity="error">El contenido que quieres subir pesa más de 200 mb</Alert></div> : ''
            }
        </>
    );
}

export default Alerts;
