import React, { useContext, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilled from '@material-ui/icons/PauseCircleFilled';

import { GlobalStateContext, GlobalDispatchContext } from '../../context/GlobalState';

export const PlayPauseButton: React.FC = () => {
    const globalState = useContext(GlobalStateContext);
    const globalDispatch = useContext(GlobalDispatchContext);

    const [isPlaying, setIsPlaying] = useState(globalState.player.playbackState.isPlaying);

    const togglePlaying = () => {
        if (globalState.player.playbackState.isPlaying) {
            globalDispatch({ type: 'pause' });
            setIsPlaying(globalState.player.playbackState.isPlaying);
        } else {
            globalDispatch({ type: 'play' });
            setIsPlaying(globalState.player.playbackState.isPlaying);
        }
    };

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
