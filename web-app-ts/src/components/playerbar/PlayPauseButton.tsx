import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilled from '@material-ui/icons/PauseCircleFilled';

import { GlobalStateContext, GlobalDispatchContext } from '../../context/GlobalState';

export const PlayPauseButton: React.FC = () => {
    const globalState = useContext(GlobalStateContext);
    const globalDispatch = useContext(GlobalDispatchContext);

    const togglePlaying = () => {
        if (globalState.player.playbackState.isPlaying) {
            globalDispatch({ type: 'pause' });
        } else {
            globalDispatch({ type: 'play' });
        }
    };

    const isPlaying = globalState.player.playbackState.isPlaying;
    return (
        <>
            <IconButton
                onClick={() => {
                    togglePlaying();
                }}
            >
                {isPlaying ? <PauseCircleFilled /> : <PlayCircleFilled />}
            </IconButton>
        </>
    );
};
