import React from 'react';
import { Typography } from '@material-ui/core';

export const NowPlaying: React.FC<{ currentTrackName: string | undefined; currentTrackArtist: string | undefined }> = ({
    currentTrackName,
    currentTrackArtist,
}) => {
    return (
        <>
            <Typography variant="h6" align="center">
                {currentTrackName}
            </Typography>
            <Typography variant="subtitle1" align="center">
                {currentTrackArtist}
            </Typography>
        </>
    );
};
