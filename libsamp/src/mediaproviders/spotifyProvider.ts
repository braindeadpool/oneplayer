import { IMediaProvider, PlayableTrack } from '../interfaces';
import axios, { AxiosInstance } from 'axios';
import { observable } from 'mobx';

import { SpotifyTrackInfo } from '../metadataproviders/spotifyMetadata';

// TODO: Move to config file.
// const SPOTIFY_CLIENT_ID = 'e93896fc729f4ec496b7f178c81e3fa4';

export class SpotifyProvider implements IMediaProvider {
    private _player: any;
    @observable private _playerIsReady: boolean;
    @observable private _playerIsConnected: boolean;
    private _accessToken: string;
    private _deviceID: string;
    private _webAPIAxiosInstance: AxiosInstance;
    uniqueID: string;
    constructor(uniqueID: string, accessToken: string) {
        this.uniqueID = uniqueID;
        this._accessToken = accessToken;
        this._deviceID = '';
        this._webAPIAxiosInstance = axios.create({
            baseURL: 'https://api.spotify.com/v1/',
        });
        this._webAPIAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${this._accessToken}`;
        this._webAPIAxiosInstance.defaults.headers.put['Content-Type'] = 'application/json';

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

    get isReady() {
        return this._playerIsReady && this._playerIsConnected;
    }

    onSpotifyWebPlaybackSDKReady() {
        // Check if already loaded
        if (this._player == null) {
            this._player = new Spotify.Player({
                name: 'libSAMP.Spotify.Player',
                getOAuthToken: (cb) => {
                    cb(this._accessToken);
                },
            });
            console.log('Spotify Player created!');

            // Ready
            this._player.addListener('ready', ({ device_id }: { device_id: string }) => {
                console.log('Ready with Device ID', device_id);
                this._deviceID = device_id;
                this._playerIsReady = true;
                this._connectPlayer();
            });

            // Not Ready
            this._player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
                console.log('Not Ready with Device ID', device_id);
                this._playerIsReady = false;
            });
        }
        this._connectPlayer();
    }

    _connectPlayer() {
        // already connected, so no need to try to connect.
        if (this._playerIsConnected) {
            return;
        }
        // ready but not connected
        if (this._playerIsReady) {
            this._player.connect().then((success: boolean) => {
                if (success) {
                    console.log('The Web Playback SDK successfully connected to Spotify!');
                    this._playerIsConnected = true;
                }
            });
            return;
        }
        // not yet ready, so we wait 5 seconds for it to be ready
        setTimeout(() => {
            this._player.connect().then((success: boolean) => {
                if (success) {
                    console.log('The Web Playback SDK successfully connected to Spotify!');
                    this._playerIsConnected = true;
                }
            });
            return;
        }, 5000);
    }

    init(): Promise<boolean> {
        if (this._player != null && this._playerIsReady) {
            return Promise.resolve(true);
        }

        return new Promise((resolve) => {
            // Wait 5 seconds for SDK to load
            setTimeout(() => {
                this.onSpotifyWebPlaybackSDKReady();
                resolve(true);
            }, 5000);
        });
    }

    getCurrentState() {
        return this._player.getPlayerState();
    }

    play(track: any | null = null) {
        console.log('spotifyProvider.play() called with', track);
        if (track) {
            return this._webAPIAxiosInstance.put(`me/player/play?device_id=${this._deviceID}`, {
                uris: [`spotify:track:${track?.source}`],
            });
        }

        return this._player.resume();
        // TODO: Check if the state is indeed playing
    }

    pause() {
        return this._player.pause();
        // TODO: Check if the state is indeed paused.
    }

    setupTrack(track: SpotifyTrackInfo | null) {
        //TODO: Implement loading the track via the Spotify Web API
        return this._webAPIAxiosInstance
            .put(`me/player/play?device_id=${this._deviceID}`, {
                uris: [`spotify:track:${track?.source}`],
            })
            .then(() => {
                // the setting up here starts the playback as well! Spotify API !
                return this.pause();
            });
    }

    togglePlayPause() {
        return this._player.togglePlayPause();
    }

    seekTo(targetTimeInMilliseconds: number) {
        // TODO: check if the time is valid
        return this._player.seek(targetTimeInMilliseconds);
    }

    setVolume(targetVolume: number) {
        return this._player.setVolume(targetVolume);
    }

    getVolume() {
        return this._player.getVolume();
    }

    getCurrentTrackTimeInMilliseconds() {
        return this._player.getCurrentState().then((state: Spotify.PlaybackState) => {
            if (!state) {
                console.error('User is not playing music through the Web Playback SDK');
                return 0;
            }
            return state.position;
        });
    }

    makePlayableTrack(trackInfo: SpotifyTrackInfo, mediaID: string) {
        return new PlayableTrack(trackInfo, this, mediaID);
    }
}
