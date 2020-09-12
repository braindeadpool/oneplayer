import { IMediaProvider } from '../interfaces';

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

        // Ready
        this._player.addListener('ready', ({ device_id }: { device_id: string }) => {
            console.log('Ready with Device ID', device_id);
            this._playerIsReady = true;
        });

        // Not Ready
        this._player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
            console.log('Not Ready with Device ID', device_id);
            this._playerIsReady = false;
        });

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
            this.setupTrack(track.source);
        }

        return this._player.resume();
        // TODO: Check if the state is indeed playing
    }

    pause() {
        return this._player.pause();
        // TODO: Check if the state is indeed paused.
    }

    setupTrack(track: any) {
        //TODO: Implement loading the track via the Spotify Web API
        return Promise.resolve(true);
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
                return;
            }
            return state.position;
        });
    }
}
