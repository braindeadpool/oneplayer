// Example config file, replace the secret values below for your app and rename this file to config.ts

const BASE_URL = 'http://127.0.0.1:8080';

export default {
    baseURL: BASE_URL,
    spotify: {
        clientID: '<SPOTIFY_CLIENT_ID>',
        secret: '<SPOTIFY_SECRET>',
        redirectURL: BASE_URL + '/',
        authorizeURL: 'https://accounts.spotify.com/authorize',
        iconPath: '/public/Spotify_Icon_RGB_Green.png',
    },
    youtube: {
        iconPath: 'public/yt_icon_rgb.png',
        apiKey: '<YOUTUBE_API_KEY>',
    },
};
