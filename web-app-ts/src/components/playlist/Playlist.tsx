import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import { useGlobalStore } from '../../context/GlobalState';
import { observer } from 'mobx-react-lite';
import { PlaylistItem } from './PlaylistItem';

export const Playlist: React.FC = observer(() => {
    const globalStore = useGlobalStore();
    const tracks = globalStore.player.currentPlaylist.tracks;

    return (
        <>
            <Box p={'1%'}>
                <Grid container justify="center">
                    {tracks.map((value, index) => {
                        return <PlaylistItem uniqueID={index.toString()} trackName={value.mediaID!} />;
                    })}
                </Grid>
            </Box>
        </>
    );
});
