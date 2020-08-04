import YTPlayer from 'yt-player';
import { IMediaProvider, PlayableTrack, ITrackInfo } from '../interfaces';
import { MILLISECONDS_IN_SECOND } from '../constants';

interface YouTubeTrackInfo extends ITrackInfo {
    source: string;
}

export class YouTubeProvider implements IMediaProvider {
    private _player: any;

    /**
     * Creates an instance of YoutubeProvider.
     * @param {(Element | string)} _attachPoint the DOM Element or id of the dom element where the youtube player object will render to.
     * @memberof VideoJSProvider
     */
    constructor(private _attachPoint: HTMLElement | string) {
        if (typeof document === 'undefined') {
            console.log('YouTube IFrame API needs a client-side document.');
            return;
        }

        this._player = new YTPlayer(this._attachPoint);
        window['yt'] = this._player;
    }

    init(): Promise<boolean> {
        // Let's do some initial setups on the player.
        // this._player.fullscreen.exit();
        // this._player.loop = false;
        // this._player.volume = 1.0;
        // this._player.currentTime = 0.0;
        return Promise.resolve(true);
    }

    getCurrentState() {
        return Promise.resolve({
            currentTrackIndex: 0,
            currentTrackTimeMilliseconds: this._player.currentTime() * MILLISECONDS_IN_SECOND,
        });
    }

    play(track: any | null = null) {
        console.log('youtubeProvider.play() called with', track);
        if (track) {
            this.setupTrack(track.source);
        }
        return new Promise<boolean>((resolve, reject) => {
            this._player.play();
            console.log('youtubeProvider._player.play() called');
            this._player.on('playing', () => {
                resolve(true);
            });
            this._player.on('unplayable', () => {
                reject(false);
            });
            this._player.on('error', () => {
                reject(false);
            });
        });
    }

    pause() {
        return new Promise<boolean>((resolve, reject) => {
            this._player.pause();
            this._player.on('paused', () => {
                resolve(true);
            });
            this._player.on('error', () => {
                reject(false);
            });
        });
    }

    togglePlayPause() {
        if (this._player.getState() == 'paused' || this._player.getState() == 'cued') {
            this._player.play();
        } else {
            this._player.pause();
        }

        return Promise.resolve(true);
    }

    seek(targetTimeInMilliseconds: number) {
        return this._player.seek(targetTimeInMilliseconds / MILLISECONDS_IN_SECOND);
    }

    setVolume(volume: number) {
        this._player.setVolume(volume);
        return Promise.resolve(this._player.getVolume());
    }

    getVolume() {
        return Promise.resolve(this._player.getVolume());
    }

    makePlayableTrack(trackInfo: YouTubeTrackInfo, mediaID: string): PlayableTrack {
        // TODO: Validate the mediaID and trackInfo.
        return new PlayableTrack(trackInfo, this, mediaID);
    }

    setupTrack(track: any) {
        console.log('track = ', track);
        return this._player.load(track.source);
    }
}
