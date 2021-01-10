import React from 'react';
import { BrowserRouter, Switch, Redirect, Route, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Helmet } from 'react-helmet';
import { AuthContainer } from './components/AuthContainer';
import { DemoContainer } from './components/DemoContainer';
import { TopBar } from './components/navbar/TopBar';
import { SearchBar } from './components/navbar/SearchBar';
import MenuItem from '@material-ui/core/MenuItem';
import './App.css';

import { GlobalStoreContextProvider } from './context/GlobalState';

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <CssBaseline />
            <Helmet>
                <meta charSet="utf-8" name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <title>OnePlayer</title>
                <link rel="canonical" href="http://localhost:3000" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300"></link>
            </Helmet>
            <GlobalStoreContextProvider>
                <TopBar>
                    <MenuItem component={Link} to="/">
                        Home
                    </MenuItem>
                    <SearchBar />
                </TopBar>

                <Switch>
                    <Route path="/">
                        <DemoContainer />
                    </Route>
                </Switch>
            </GlobalStoreContextProvider>
        </BrowserRouter>
    );
};
