import React from 'react';
import { useGlobalStore } from '../../context/GlobalState';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react-lite';
import config from '../../config';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);

export const YouTubeAuthProvider: React.FC = observer((props) => {
    const globalStore = useGlobalStore();
    const classes = useStyles();

    // If Spotify player is ready, it is already authorized.
    if (globalStore.mediaProviders.get('YouTube')?.isReady) {
        return (
            <div className={classes.root}>
                <Avatar alt="YouTube icon" src={config.youtube.iconPath} />
                <Typography variant="overline" display="block" gutterBottom align="center">
                    Youtube available!
                </Typography>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <Avatar alt="YouTube icon" src={config.youtube.iconPath} />
            <Typography variant="button" color="secondary" display="block" gutterBottom align="center">
                Youtube player is not yet loaded!
            </Typography>
        </div>
    );
});
