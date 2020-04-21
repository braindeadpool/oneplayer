import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Helmet } from 'react-helmet';
import { MainContainer } from './components/MainContainer';
import './App.css';

import { GlobalContextProvider } from './context/GlobalState';

export const App: React.FC = () => {
    return (
        <>
            <CssBaseline />
            <Helmet>
                <meta charSet="utf-8" name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <title>OnePlayer</title>
                <link rel="canonical" href="http://localhost:3000" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300"></link>
            </Helmet>

            <GlobalContextProvider>
                <MainContainer />
            </GlobalContextProvider>
        </>
    );
};
