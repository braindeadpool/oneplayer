import React, { useContext } from 'react';
import { useMachine } from '@xstate/react';
import Grid from '@material-ui/core/Grid';
import { SliderBar } from './SliderBar';
import { PlayPauseButton } from './PlayPauseButton';
import { Box } from '@material-ui/core';
import { NowPlaying } from './NowPlaying';
import { GlobalStateContext } from '../../context/GlobalState';

export const PlayerBar: React.FC = () => {
    const globalState = useContext(GlobalStateContext);
    const [current] = useMachine(globalState);

    return (
        <>
            <Box p={'1%'}>
                <Grid container justify="center">
                    <Grid container justify="center" spacing={4}>
                        <Grid item xs={12}>
                            <NowPlaying currentTrackName={current.context.currentTrackName} />
                        </Grid>
                        <Grid item xs={12}>
                            <SliderBar />
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                        <PlayPauseButton />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};
