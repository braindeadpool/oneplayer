import React, { useContext } from 'react';
import { useMachine } from '@xstate/react';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilled from '@material-ui/icons/PauseCircleFilled';

import { GlobalStateContext } from '../../context/GlobalState';

export const PlayPauseButton: React.FC = () => {
    const globalState = useContext(GlobalStateContext);
    const [current, send] = useMachine(globalState);

    const togglePlaying = () => {
        if (current.matches('playing')) {
            send('PAUSE');
        } else {
            send('PLAY');
        }
    };

    return (
        <>
            <IconButton
                onClick={() => {
                    togglePlaying();
                }}
            >
                {current.matches('playing') ? <PauseCircleFilled /> : <PlayCircleFilled />}
            </IconButton>
        </>
    );
};
