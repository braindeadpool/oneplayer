import React, { useContext } from 'react';
import { GlobalStateContext } from '../../context/GlobalState';
import { Typography } from '@material-ui/core';

export const NowPlaying: React.FC<{ currentTrackName: string | undefined }> = ({ currentTrackName }) => {
    return (
        <>
            <Typography variant="subtitle1">
                Now Playing: <span> {currentTrackName} </span>
            </Typography>
        </>
    );
};
