import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { useNavBarStyles } from './styles';

export const TopBar: React.FC = ({ children }) => {
    const classes = useNavBarStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>{children}</Toolbar>
            </AppBar>
        </div>
    );
};
