import React, { useEffect, useContext } from 'react';
import { PlayerBar } from './playerbar/PlayerBar';
import Typography from '@material-ui/core/Typography';
import { useGlobalStore } from '../context/GlobalState';
import { YouTubeProvider } from 'libsamp';
import { observer } from 'mobx-react-lite';

export const DemoContainer: React.FC = observer((props) => {
    const globalStore = useGlobalStore();

    useEffect(() => {
        // Initialize the demo video as the current playing track

        const youtubeProvider = new YouTubeProvider('demoPlayer');
        youtubeProvider.init().then(() => {
            // Let's setup the initial demo track.
            const demoTrack = youtubeProvider.makePlayableTrack(
                {
                    durationInMilliseconds: 1000000,
                    source: 'xuCn8ux2gbs',
                },
                'xuCn8ux2gbs',
            );
            // // Let's dispatch to add the new track and start playback.
            globalStore.player.addPlayableTrack(demoTrack);

            globalStore.mediaProviders.set('demoPlayer', youtubeProvider);
        });
    });

    return (
        <div>
            <Typography variant="h1" align="center" gutterBottom>
                {' '}
                OnePlayerDemo{' '}
            </Typography>
            <div id="demoPlayer"></div>
            <PlayerBar></PlayerBar>
        </div>
    );
});
