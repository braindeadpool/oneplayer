import { IMediaProvider, PlayableTrack } from '../interfaces';
import Plyr from 'plyr';
import { MILLISECONDS_IN_SECOND } from '../constants';

type PlyrTrackInfo = {
    durationInMilliseconds: number;
    source: string;
    provider: Plyr.Provider;
};

/**
 * PlyrProvider wraps around the Plyr API for Youtube, Vimeo and HTML5 support.
 * https://github.com/sampotts/plyr
 * @export
 * @class PlyrProvider
 * @implements {IMediaProvider}
 */
export class PlyrProvider implements IMediaProvider {
    private _player: Plyr;

    private setPlayerSource(track: PlyrTrackInfo) {
        // Currently we only support video playback.
        this._player.source = {
            type: 'video',
            sources: [
                {
                    src: track.source,
                    provider: track.provider,
                },
            ],
        };
    }
    /**
     * Creates an instance of PlyrProvider.
     * @param {(HTMLElement | string)} _attachPoint the HTMLElement or string selector where the media player object will attach to in the DOM.
     * @memberof PlyrProvider
     */
    constructor(
        private _attachPoint: HTMLElement | string,
        private _playlist: Array<PlyrTrackInfo> = [],
        private _currentTrackIndex: number = 0,
    ) {
        this._player = new Plyr(this._attachPoint);
    }

    init(): Promise<boolean> {
        // Let's do some initial setups on the player.
        // this._player.fullscreen.exit();
        this._player.autoplay = false;
        // this._player.loop = false;
        // this._player.volume = 1.0;
        // this._player.currentTime = 0.0;
        return Promise.resolve(true);
    }

    getCurrentState() {
        return Promise.resolve({
            playlist: this._playlist,
            currentTrackIndex: this._currentTrackIndex,
            currentTrackTimeMilliseconds: this._player.currentTime * MILLISECONDS_IN_SECOND,
        });
    }

    play() {
        if (this._playlist.length == 0 || this._currentTrackIndex >= this._playlist.length) {
            return Promise.resolve(false);
        }
        if (!this._player.source) {
            this.setPlayerSource(this._playlist[this._currentTrackIndex]);
        }
        this._player.play();
        console.log('started plyrprovider playback');
        console.log(this);
        return Promise.resolve(true);
    }

    pause() {
        if (this._playlist.length == 0 || this._currentTrackIndex >= this._playlist.length) {
            return Promise.resolve(false);
        }
        if (!this._player.source) {
            this.setPlayerSource(this._playlist[this._currentTrackIndex]);
        }
        this._player.pause();
        return Promise.resolve(true);
    }

    togglePlayPause() {
        this._player.togglePlay();
        return Promise.resolve(true);
    }

    seek(targetTimeInMilliseconds: number) {
        this._player.currentTime = targetTimeInMilliseconds / MILLISECONDS_IN_SECOND;
        // TODO: Check if the seek has finished and resolve.
        return Promise.resolve(this._player.currentTime);
    }

    setVolume(volume: number) {
        this._player.volume = volume;
        return Promise.resolve(this._player.volume);
    }

    getVolume() {
        return Promise.resolve(this._player.volume);
    }

    next() {
        if (this._currentTrackIndex < this._playlist.length - 1) {
            this._currentTrackIndex += 1;
            this.setPlayerSource(this._playlist[this._currentTrackIndex]);
        }
        return this.getCurrentState();
    }

    previous() {
        if (this._currentTrackIndex > 0) {
            this._currentTrackIndex -= 1;
            this.setPlayerSource(this._playlist[this._currentTrackIndex]);
        }
        return this.getCurrentState();
    }

    goToIndex(index: number) {
        if (index < this._playlist.length) {
            this._currentTrackIndex = index;
            this.setPlayerSource(this._playlist[this._currentTrackIndex]);
        }
        return this.getCurrentState();
    }

    makePlayableTrack(trackInfo: PlyrTrackInfo, mediaID: string): PlayableTrack {
        // TODO: Validate the mediaID and trackInfo.
        return new PlayableTrack(trackInfo, this, mediaID);
    }
}
