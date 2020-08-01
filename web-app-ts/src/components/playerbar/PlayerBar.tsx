import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { SliderBar } from './SliderBar';
import { PlayPauseButton } from './PlayPauseButton';
import { Box } from '@material-ui/core';
import { NowPlaying } from './NowPlaying';
import { useGlobalStore } from '../../context/GlobalState';
import { observer } from 'mobx-react-lite';

export const PlayerBar: React.FC = observer(() => {
    const globalStore = useGlobalStore();
    const currentTrackName = globalStore.player.playbackState.currentTrack?.mediaID;
    return (
        <>
            <Box p={'1%'}>
                <Grid container justify="center">
                    <Grid container justify="center" spacing={4}>
                        <Grid item xs={12}>
                            <NowPlaying currentTrackName={currentTrackName} />
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
});
