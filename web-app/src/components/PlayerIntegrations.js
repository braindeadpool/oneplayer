import React from 'react';
import { useState, useContext } from 'react';
import youtubeIcon from '../assets/yt_icon_rgb.png'
import { create } from 'nano-css';
import { SpotifyRedirect } from '../spotify/redirect';
import { SpotifyLogger } from '../spotify/integration';
import { Switch, Route } from 'react-router-dom';


const nano = create();

nano.put('.playerIcon', {
    width: '30px',
    height: 'auto'
});

export const spotifyContext = React.createContext({
    accessToken: "",
    setAccessToken: () => { },
});

export function SpotifyIntegration() {
    const [accessToken, setAccessToken] = useState("");

    return (
        <spotifyContext.Provider value={{ accessToken:accessToken, setAccessToken:setAccessToken }}>
            <Switch>
                <Route path="/spotifyredirect" component={SpotifyRedirect} />
                <Route path="/" component={SpotifyWithToken} />
            </Switch>
        </spotifyContext.Provider>
    )
}

function SpotifyWithToken() {

    const contextState = useContext(spotifyContext);
    return (

    <SpotifyLogger contextState={contextState} />

    )
}



export function YoutubeIntegration() {
    return (
        <div>
            <img src={youtubeIcon} alt='youtube-icon' className='playerIcon' />
        </div>
    );
}