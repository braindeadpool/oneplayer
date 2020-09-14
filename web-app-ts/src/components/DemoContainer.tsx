import React, { useEffect, useContext } from 'react';
import { PlayerBar } from './playerbar/PlayerBar';
import { Playlist } from './playlist/Playlist';
import Typography from '@material-ui/core/Typography';
import { useGlobalStore } from '../context/GlobalState';
import { YouTubeProvider, SpotifyProvider } from 'libsamp';
import { observer } from 'mobx-react-lite';
import Grid from '@material-ui/core/Grid';

export const DemoContainer: React.FC = observer((props) => {
    const globalStore = useGlobalStore();

    useEffect(() => {
        // Initialize the demo video as the current playing track

        const youtubeProvider = new YouTubeProvider('demoPlayer');
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

            globalStore.mediaProviders.set('demoPlayer', youtubeProvider);

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

        // Let's add a Spotify track too
        const spotifyAccessToken =
            'BQAvkXKVBvH7LPKNutAg_goaWBanUYSFEo6MBwVYGxEf34j5rDWMBGeiib0IB0Gk9DqrTPo4JF8ykBjgJrlIk4xF-cwJpZmHtQr-hMRaIoH5JdhqlERNhFobT1mArKBT-rn1AX1tokUw-5MBU1jypBUtGlEB4d8olv1TL3_zwVw_U6gxMiME-rilItOkEiDCY51ClYphOAF8';
        const spotifyProvider = new SpotifyProvider(spotifyAccessToken);
        spotifyProvider.init().then(() => {
            globalStore.player.addPlayableTrack(
                spotifyProvider.makePlayableTrack(
                    {
                        durationInMilliseconds: 207000,
                        source: '6112RGHQwT1lgG897P2eoq',
                    },
                    'You and me as one - Jack Savoretti, Sigma',
                ),
            );
        });
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
                    <div id="demoPlayer"></div>
                    <PlayerBar></PlayerBar>
                </Grid>
                <Grid item xs={3}>
                    Menu to go here!
                </Grid>
            </Grid>
        </>
    );
});
