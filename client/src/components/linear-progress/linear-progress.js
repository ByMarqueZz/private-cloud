import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{props.current_value+'/'+props.max_value}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel(props) {

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={props.progress} current_value={props.current_value} max_value={props.max_value}/>
    </Box>
  );
}