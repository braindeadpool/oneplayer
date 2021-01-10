import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { useGlobalStore } from '../../context/GlobalState';
import { observer } from 'mobx-react-lite';
import { PlaylistItem } from './PlaylistItem';
import config from '../../config';

const getIconPathFromMediaProvider = (mediaProviderName?: string) => {
    console.log('unique ID = ', mediaProviderName);
    switch (mediaProviderName) {
        case 'Spotify':
            return config.spotify.iconPath;
        case 'YouTube':
            return config.youtube.iconPath;
    }
};

export const Playlist: React.FC = observer(() => {
    const globalStore = useGlobalStore();
    const tracks = globalStore.player.currentPlaylist.tracks;

    return (
        <>
            <Box p={'1%'}>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h3">Playlist</Typography>
                        <List>
                            {tracks.map((value, index) => {
                                return (
                                    <PlaylistItem
                                        uniqueID={index.toString()}
                                        trackIndex={index}
                                        trackName={value.mediaID!}
                                        isPlaying={globalStore.player.currentTrackIndex == index}
                                        iconPath={getIconPathFromMediaProvider(
                                            globalStore.player.currentPlaylist.tracks[index].IMediaProvider.uniqueID,
                                        )}
                                    />
                                );
                            })}
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
});
