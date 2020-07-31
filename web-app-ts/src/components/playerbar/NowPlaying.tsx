import React from 'react';
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
