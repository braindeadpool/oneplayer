import { IMediaProvider } from '../interfaces';

const SPOTIFY_DEFAULT_VOLUME = 0.5;

export class SpotifyProvider implements IMediaProvider {
    private _player: any;
    private _playerIsReady: boolean;
    private _accessToken: string;

    constructor(accessToken: string) {
        this._accessToken = accessToken;
        if (typeof document === 'undefined') {
            console.log('Spotify Web Playback SDK needs a client-side document.');
            return;
        }

        /* Dynamically load the Spotify Web Playback SDK */
        /* https://developer.spotify.com/documentation/web-playback-sdk/quick-start/ */
        let tag = document.createElement('script');
        tag.src = 'https://sdk.scdn.co/spotify-player.js';
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);

        (<any>window).onSpotifyWebPlaybackSDKReady = this.onSpotifyWebPlaybackSDKReady.bind(this);
    }

    onSpotifyWebPlaybackSDKReady() {
        // Check if already loaded
        if (this._player != null && this._playerIsReady) {
            return;
        }

        this._player = new Spotify.Player({
            name: 'libSAMP.Spotify.Player',
            getOAuthToken: (cb) => {
                cb(this._accessToken);
            },
        });

        console.log('Spotify Player created!');
        // we connect the player to web api.
        this._player.connect().then((success: boolean) => {
            if (success) {
                console.log('The Web Playback SDK successfully connected to Spotify!');
                this._playerIsReady = true;
            }
        });
    }

    init(): Promise<boolean> {
        if (this._player != null && this._playerIsReady) {
            return Promise.resolve(true);
        }

        return new Promise((resolve) => {
            // Wait 5 seconds for API to load
            setTimeout(() => {
                this.onSpotifyWebPlaybackSDKReady();
                resolve(true);
            }, 5000);
        });
    }
}
