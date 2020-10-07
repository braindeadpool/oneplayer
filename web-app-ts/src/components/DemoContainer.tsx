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
import { SpotifyMetadata, SpotifyTrackInfo } from 'libsamp';

const YOUTUBE_IFRAME_DIV_ID = 'YouTubeIFrameDiv';
const SPOTIFY_ACCESS_TOKEN =
    'BQDLodDFVXnS_Rhhych4k2PkhwJsxVms7YsaTPfiil0Yd_G0yOe5o_-TeXT4OaNr5ZO47kE8XSl1YImWzBP-fFyNj3S0QoVLdFKjhtctD_aRCZ0dWMoB8-qmf3-xez4JEDDNSH37_9RlACuIozoWUX-a8GYe14yh1ejk6--D0QOQRCF3F3s';

export const DemoContainer: React.FC = observer((props) => {
    const globalStore = useGlobalStore();

    useEffect(() => {
        // Initialize the demo video as the current playing track

        // Check if the mediaProvider already exists
        if (!globalStore.mediaProviders.get('YouTube')) {
            const youtubeProvider = new YouTubeProvider('YouTube', YOUTUBE_IFRAME_DIV_ID);
            youtubeProvider.init().then(() => {
                // Let's setup the initial demo track.
                const demoTrack = youtubeProvider.makePlayableTrack(
                    {
                        durationInMilliseconds: 1165000,
                        source: 'xuCn8ux2gbs',
                        artistName: 'Bill Wurtz',
                        trackName: 'history of the entire world, i guess',
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
                            artistName: 'Ilia TS',
                            trackName: 'The Joker | Chaos',
                        },
                        'The Joker | Chaos',
                    ),
                );
            });
        }

        if (!globalStore.mediaProviders.get('Spotify')) {
            // Let's add a Spotify track too
            const spotifyProvider = new SpotifyProvider('Spotify', SPOTIFY_ACCESS_TOKEN);

            if (!globalStore.metadataProviders.get('Spotify')) {
                const spotifyMetadataAPI = new SpotifyMetadata(SPOTIFY_ACCESS_TOKEN, spotifyProvider);
                globalStore.metadataProviders.set('Spotify', spotifyMetadataAPI);
                globalStore.searcher.addMetadataProvider(spotifyMetadataAPI);
            }
            const spotifyMetadataAPI = globalStore.metadataProviders.get('Spotify');

            spotifyProvider.init().then(() => {
                spotifyMetadataAPI?.getTrackInfo('6112RGHQwT1lgG897P2eoq').then((demoTrack: SpotifyTrackInfo) => {
                    globalStore.player.addPlayableTrack(
                        spotifyProvider.makePlayableTrack(demoTrack, demoTrack.trackName),
                    );
                });
            });
            globalStore.mediaProviders.set('Spotify', spotifyProvider);
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
                <Grid item xs={6}>
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
                    Menu to go here!
                </Grid>
            </Grid>
        </>
    );
});
