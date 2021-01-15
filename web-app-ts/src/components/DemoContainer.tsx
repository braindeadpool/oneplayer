import React, { useEffect } from 'react';
import { PlayerBar } from './playerbar/PlayerBar';
import { Playlist } from './playlist/Playlist';
import Typography from '@material-ui/core/Typography';
import { useGlobalStore } from '../context/GlobalState';
import { YouTubeContainer } from './mediaprovider/YouTubeContainer';
import { SpotifyContainer } from './mediaprovider/SpotifyContainer';
import { YouTubeProvider, SpotifyProvider } from 'libsamp';
import { observer } from 'mobx-react-lite';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import { SpotifyMetadata, YouTubeMetadata } from 'libsamp';
import { SpotifyAuthProvider } from './authprovider/SpotifyAuthProvider';
import { YouTubeAuthProvider } from './authprovider/YouTubeAuthProvider';
import config from '../config';

const YOUTUBE_IFRAME_DIV_ID = 'YouTubeIFrameDiv';

export const DemoContainer: React.FC = observer((props) => {
    const globalStore = useGlobalStore();

    useEffect(() => {
        // Check if the mediaProvider already exists
        if (!globalStore.mediaProviders.get('YouTube')) {
            const youtubeProvider = new YouTubeProvider('YouTube', YOUTUBE_IFRAME_DIV_ID);
            youtubeProvider.init();
            globalStore.mediaProviders.set('YouTube', youtubeProvider);
            if (!globalStore.metadataProviders.get('YouTube')) {
                const youtubeMetadataAPI = new YouTubeMetadata(config.youtube.apiKey, youtubeProvider);
                globalStore.metadataProviders.set('YouTube', youtubeMetadataAPI);
                globalStore.searcher.addMetadataProvider(youtubeMetadataAPI);
            }
        }

        if (!globalStore.mediaProviders.get('Spotify')) {
            // Check if spotify is authorized
            const spotifyToken = window.localStorage.getItem('spotifyAuthToken');
            if (!spotifyToken) {
                return;
            }
            // Let's add a Spotify track too
            const spotifyProvider = new SpotifyProvider('Spotify', spotifyToken);
            spotifyProvider.init();
            if (!globalStore.metadataProviders.get('Spotify')) {
                const spotifyMetadataAPI = new SpotifyMetadata(spotifyToken, spotifyProvider);
                globalStore.metadataProviders.set('Spotify', spotifyMetadataAPI);
                globalStore.searcher.addMetadataProvider(spotifyMetadataAPI);
            }

            globalStore.mediaProviders.set('Spotify', spotifyProvider);
        }

        // Check if playlist exists and load it
        const currentPlaylist = localStorage.getItem('currentPlaylist');
        if (currentPlaylist) {
            const playlist = JSON.parse(currentPlaylist);
            for (let track of playlist.tracks) {
                const mediaProvider = globalStore.mediaProviders.get(track.mediaProvider.name);
                if (mediaProvider) {
                    globalStore.player.addPlayableTrack(
                        mediaProvider.makePlayableTrack(track.trackInfo, track.mediaID),
                    );
                }
            }
        }
    });

    (window as any)['global_store'] = globalStore;

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h1" align="center" gutterBottom>
                        {' '}
                        OnePlayerDemo{' '}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Playlist />
                </Grid>
                <Grid item xs={6} alignItems="center" justify="center">
                    <div id="nowPlayingDiv">
                        <YouTubeContainer
                            containerDivID="YouTubePlayerContainer"
                            iframeDivID={YOUTUBE_IFRAME_DIV_ID}
                        ></YouTubeContainer>
                        <SpotifyContainer containerDivID="SpotifyPlayerContainer"></SpotifyContainer>
                    </div>
                    <PlayerBar></PlayerBar>
                </Grid>
                <Grid item xs={3}>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Available media providers
                            </ListSubheader>
                        }
                    >
                        <ListItem button>
                            <YouTubeAuthProvider />
                        </ListItem>
                        <ListItem button>
                            <SpotifyAuthProvider />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </>
    );
});
