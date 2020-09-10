import React from 'react';
import Grid from '@material-ui/core/Grid';

type PlaylistItemProps = {
    uniqueID: string;
    trackName: string;
};

export const PlaylistItem: React.FC<PlaylistItemProps> = (props) => {
    return (
        <>
            <Grid item xs={12} key={props.uniqueID}>
                <h4>{props.trackName}</h4>
            </Grid>
        </>
    );
};
