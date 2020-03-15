import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilled from '@material-ui/icons/PauseCircleFilled';

export const PlayPauseButton = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const togglePlaying = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <>
        <IconButton>
        {isPlaying 
            ? <PauseCircleFilled onClick={() => {togglePlaying()}}/>
        : <PlayCircleFilled onClick={() => {togglePlaying()}}/>
        }
        </IconButton>
        </>
    );
};
