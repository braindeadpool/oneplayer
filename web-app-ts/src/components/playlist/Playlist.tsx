import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { useGlobalStore } from '../../context/GlobalState';
import { observer } from 'mobx-react-lite';
import { PlaylistItem } from './PlaylistItem';
import { getIconPathFromMediaProvider } from '../../utils';

export const Playlist: React.FC = observer(() => {
    const globalStore = useGlobalStore();
    const tracks = globalStore.player.currentPlaylist.tracks;

    return (
        <>
            <Box p={'1%'} height="95%">
                <Typography variant="h3">Playlist</Typography>
                <List style={{ maxHeight: '80%', overflow: 'auto' }}>
                    {tracks.map((value, index) => {
                        return (
                            <PlaylistItem
                                uniqueID={index.toString()}
                                trackIndex={index}
                                trackName={value.trackInfo.trackName}
                                isPlaying={globalStore.player.currentTrackIndex == index}
                                iconPath={getIconPathFromMediaProvider(
                                    globalStore.player.currentPlaylist.tracks[index].IMediaProvider.uniqueID,
                                )}
                            />
                        );
                    })}
                </List>
            </Box>
        </>
    );
});
