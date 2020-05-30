import React from 'react';
import { PlayerBar } from './playerbar/PlayerBar';
import Typography from '@material-ui/core/Typography';

export const DemoContainer: React.FC = (props) => {
    return (
        <div>
            <Typography variant="h1" align="center" gutterBottom>
                {' '}
                OnePlayerDemo{' '}
            </Typography>
            <PlayerBar></PlayerBar>
        </div>
    );
};
