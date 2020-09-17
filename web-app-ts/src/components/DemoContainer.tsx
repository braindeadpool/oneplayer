import React, { useEffect, useContext } from 'react';
import { PlayerBar } from './playerbar/PlayerBar';
import { Playlist } from './playlist/Playlist';
import Typography from '@material-ui/core/Typography';
import { useGlobalStore } from '../context/GlobalState';
import { YouTubeContainer } from './mediaprovider/YouTubeContainer';
import { SpotifyContainer } from './mediaprovider/SpotifyContainer';
import { YouTubeProvider, SpotifyProvider } from 'libsamp';
import { observer } from 'mobx-react-lite';
import Grid from '@material-ui/core/Grid';
import { SpotifyMetadata, SpotifyTrackInfo } from 'libsamp';

const YOUTUBE_IFRAME_DIV_ID = 'YouTubeIFrameDiv';
const SPOTIFY_ACCESS_TOKEN =
    'BQBNlX85PT9WCSlq9DMIW0PW3nM6XzUQgowTXI5-UVJWU8dzGZEj2QJ8RD7HX-rkebqXJUb3g3tKYiXafnVmnCDQeB2xjXDvva4Bz_F5BnyptbwcgQH5A2rE3HhzJjDRwdmG8z9i71jMwvcodiXMdoGuu9WOjAasl8Ve-upL1ecrOdehYq9Ku8nFjDRtaVwOIasmE3Px_y9r';

export const DemoContainer: React.FC = observer((props) => {
    const globalStore = useGlobalStore();

    useEffect(() => {
        // Initialize the demo video as the current playing track

        // Check if the mediaProvider already exists
        if (!globalStore.mediaProviders.get('YouTube')) {
            const youtubeProvider = new YouTubeProvider(YOUTUBE_IFRAME_DIV_ID);
            youtubeProvider.init().then(() => {
                // Let's setup the initial demo track.
                const demoTrack = youtubeProvider.makePlayableTrack(
                    {
                        durationInMilliseconds: 1165000,
                        source: 'xuCn8ux2gbs',
                    },
                    'history of the entire world, i guess',
                );
                // // Let's dispatch to add the new track and start playback.
                globalStore.player.addPlayableTrack(demoTrack);

                globalStore.mediaProviders.set('YouTube', youtubeProvider);

                // Let's add another video to the playlist
                globalStore.player.addPlayableTrack(
                    youtubeProvider.makePlayableTrack(
                        {
                            durationInMilliseconds: 160000,
                            source: 'ZZfSm1u7YmM',
                        },
                        'The Joker | Chaos',
                    ),
                );
            });
        }

        if (!globalStore.metadataAPIs.get('Spotify')) {
            const spotifyMetadataAPI = new SpotifyMetadata(SPOTIFY_ACCESS_TOKEN);
            globalStore.metadataAPIs.set('Spotify', spotifyMetadataAPI);
        }

        if (!globalStore.mediaProviders.get('Spotify')) {
            // Let's add a Spotify track too
            const spotifyProvider = new SpotifyProvider(SPOTIFY_ACCESS_TOKEN);
            const spotifyMetadataAPI = globalStore.metadataAPIs.get('Spotify');

            spotifyProvider.init().then(() => {
                spotifyMetadataAPI?.getTrackInfo('6112RGHQwT1lgG897P2eoq').then((demoTrack) => {
                    globalStore.player.addPlayableTrack(
                        spotifyProvider.makePlayableTrack(
                            demoTrack as SpotifyTrackInfo,
                            (demoTrack as SpotifyTrackInfo).trackName,
                        ),
                    );
                });
            });
            globalStore.mediaProviders.set('Spotify', spotifyProvider);
        }
    });

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
                <Grid item xs={6}>
                    <YouTubeContainer
                        containerDivID="YouTubePlayerContainer"
                        iframeDivID={YOUTUBE_IFRAME_DIV_ID}
                    ></YouTubeContainer>
                    <SpotifyContainer containerDivID="SpotifyPlayerContainer"></SpotifyContainer>
                    <PlayerBar></PlayerBar>
                </Grid>
                <Grid item xs={3}>
                    Menu to go here!
                </Grid>
            </Grid>
        </>
    );
});
