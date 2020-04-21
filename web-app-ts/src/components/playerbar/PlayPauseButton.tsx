import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilled from '@material-ui/icons/PauseCircleFilled';

import { GlobalStateContext } from '../../context/GlobalState';

export const PlayPauseButton: React.FC = () => {
    const globalState = useContext(GlobalStateContext);
    const togglePlaying = () => {
        if (globalState.player.playbackState.isPlaying) {
            globalState.player.pause();
        } else {
            globalState.player.play();
        }
    };

    return (
        <>
            <IconButton>
                {globalState.player.playbackState.isPlaying ? (
                    <PauseCircleFilled
                        onClick={() => {
                            togglePlaying();
                        }}
                    />
                ) : (
                    <PlayCircleFilled
                        onClick={() => {
                            togglePlaying();
                        }}
                    />
                )}
            </IconButton>
        </>
    );
};
