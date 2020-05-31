import React, { useEffect, useContext } from 'react';
import { PlayerBar } from './playerbar/PlayerBar';
import Typography from '@material-ui/core/Typography';
import { GlobalStateContext } from '../context/GlobalState';
import { PlyrProvider } from 'libsamp';

export const DemoContainer: React.FC = (props) => {
    const globalState = useContext(GlobalStateContext);

    // Initialize the demo video as the current playing track
    const plyrProvider = new PlyrProvider('#demoPlayer');
    plyrProvider.init().then(() => {
        // Let's setup the initial demo track.
        const demoTrack = plyrProvider.makePlayableTrack(
            {
                durationInMilliseconds: 1000000,
                source: 'xuCn8ux2gbs',
                provider: 'youtube',
            },
            'xuCn8ux2gbs',
        );
        globalState.player.addPlayableTrack(demoTrack);
        globalState.player.play();
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
};
