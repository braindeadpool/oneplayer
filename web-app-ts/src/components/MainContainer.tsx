import React from 'react';
import {PlayerBar} from './playerbar/PlayerBar';
import Typography from '@material-ui/core/Typography'

export const MainContainer: React.FC = () => {
    return (
        <div>
            <Typography variant='h1' align='center' gutterBottom> OnePlayer </Typography>
            <PlayerBar></PlayerBar>
        </div>
    )
}
