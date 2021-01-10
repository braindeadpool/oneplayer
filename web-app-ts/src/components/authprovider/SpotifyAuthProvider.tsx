import React from 'react';
import { useGlobalStore } from '../../context/GlobalState';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react-lite';
import { SpotifyAuth } from 'react-spotify-auth';
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

export const SpotifyAuthProvider: React.FC = observer((props) => {
    const globalStore = useGlobalStore();
    const classes = useStyles();

    // If Spotify player is ready, it is already authorized.
    if (globalStore.mediaProviders.get('Spotify')?.isReady) {
        return (
            <div className={classes.root}>
                <Avatar alt="Spotify icon" src={config.spotify.iconPath} />
                <Typography variant="overline" display="block" gutterBottom align="center">
                    Spotify connected!
                </Typography>
            </div>
        );
    } else {
        return (
            <SpotifyAuth
                redirectUri={config.spotify.redirectURL}
                clientID={config.spotify.clientID}
                scopes={['streaming', 'user-read-email', 'user-read-private']}
                localStorage={true}
                title="Authorize Spotify"
            />
        );
    }
});
