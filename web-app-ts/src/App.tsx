import React from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Helmet } from 'react-helmet';
import { MainContainer } from './components/MainContainer';
import { DemoContainer } from './components/DemoContainer';
import { TopBar } from './components/navbar/TopBar';
import { SearchBar } from './components/navbar/SearchBar';
import MenuItem from '@material-ui/core/MenuItem';
import './App.css';

import { GlobalContextProvider } from './context/GlobalState';

export const App: React.FC = () => {
    return (
        <HashRouter>
            <CssBaseline />
            <Helmet>
                <meta charSet="utf-8" name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <title>OnePlayer</title>
                <link rel="canonical" href="http://localhost:3000" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300"></link>
            </Helmet>
            <TopBar>
                <MenuItem component={Link} to="/">
                    Home
                </MenuItem>
                <MenuItem component={Link} to="/demo">
                    Demo
                </MenuItem>
                <SearchBar placeholder="To be implemented" />
            </TopBar>

            <Switch>
                <Route path="/demo">
                    <GlobalContextProvider>
                        <DemoContainer />
                    </GlobalContextProvider>
                </Route>

                <Route path="/">
                    <GlobalContextProvider>
                        <MainContainer />
                    </GlobalContextProvider>
                </Route>
            </Switch>
        </HashRouter>
    );
};
