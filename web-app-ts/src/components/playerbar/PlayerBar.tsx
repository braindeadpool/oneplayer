import React from 'react';
import Grid from '@material-ui/core/Grid';
import { SliderBar } from './SliderBar';
import { PlayPauseButton } from './PlayPauseButton';
import { Box } from '@material-ui/core';

export const PlayerBar: React.FC = () => {
    return (
        <div>
            <Box p={"5%"}>
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <SliderBar />
                    </Grid>
                    <Grid item xs={1} justify="center">
                        <PlayPauseButton />
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};
