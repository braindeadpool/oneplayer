import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useGlobalStore } from '../context/GlobalState';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

export const AuthContainer: React.FC = observer((props) => {
    const globalStore = useGlobalStore();
    const classes = useStyles();

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h1" align="center" gutterBottom>
                        Authorize
                    </Typography>
                </Grid>
                <Grid item xs={3}></Grid>

                <Grid item xs={6}>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Available media providers
                            </ListSubheader>
                        }
                        className={classes.root}
                    >
                        <ListItem button>
                            <ListItemIcon>
                                <Avatar alt="Spotify icon" src="/public/Spotify_Icon_RGB_Green.png" />
                            </ListItemIcon>
                            <ListItemText primary="Spotify" />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </>
    );
});
