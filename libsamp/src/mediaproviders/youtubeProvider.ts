import YouTubePlayer from 'youtube-player';
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
        console.log(_attachPoint);
        this._player = YouTubePlayer(this._attachPoint);
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
        if (track) {
            this.setupTrack(track.source).then(this._player.playVideo());
        } else {
            return this._player.playVideo();
        }
    }

    pause() {
        return this._player.pauseVideo();
    }

    togglePlayPause() {
        // DO nothing for now
        return Promise.resolve(true);
    }

    seek(targetTimeInMilliseconds: number) {
        return this._player.seekTo(targetTimeInMilliseconds / MILLISECONDS_IN_SECOND);
    }

    setVolume(volume: number) {
        this._player.volume(volume);
        return Promise.resolve(this._player.volume());
    }

    getVolume() {
        return Promise.resolve(this._player.volume());
    }

    makePlayableTrack(trackInfo: YouTubeTrackInfo, mediaID: string): PlayableTrack {
        // TODO: Validate the mediaID and trackInfo.
        return new PlayableTrack(trackInfo, this, mediaID);
    }

    setupTrack(track: any) {
        console.log('track = ', track);
        this._player.loadVideoById(track.source);
        return this._player.pauseVideo();
    }
}
