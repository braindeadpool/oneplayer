import { IMediaProvider, ITrackInfo } from '../interfaces';
import { Plyr } from 'plyr';

const MILLISECONDS_IN_SECOND = 1000;

type PlyrTrackInfo = {
    durationInMilliseconds: number;
    source: string;
    provider: string;
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
    /**
     * Creates an instance of PlyrProvider.
     * @param {(HTMLElement | string)} _attachPoint the HTMLElement or string selector where the media player object will attach to in the DOM.
     * @memberof PlyrProvider
     */
    constructor(
        private _attachPoint: HTMLElement | string,
        private _playlist: Array<PlyrTrackInfo> = [],
        private _currentTrackIndex: number = 0,
    ) {}

    init(): Promise<boolean> {
        this._player = new Plyr(this._attachPoint);
        // Let's do some initial setups on the player.
        this._player.fullscreen.active = false;
        this._player.autoplay = false;
        this._player.loop = false;
        this._player.volume = 1.0;
        this._player.currentTime = 0.0;
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
            // Currently we only support video playback.
            this._player.source = {
                type: 'video',
                sources: [
                    {
                        src: this._playlist[this._currentTrackIndex].source,
                        provider: this._playlist[this._currentTrackIndex].provider,
                    },
                ],
            };
        }
        this._player.play();
        return Promise.resolve(true);
    }

    pause() {
        if (this._playlist.length == 0 || this._currentTrackIndex >= this._playlist.length) {
            return Promise.resolve(false);
        }
        if (!this._player.source) {
            // Currently we only support video playback.
            this._player.source = {
                type: 'video',
                sources: [
                    {
                        src: this._playlist[this._currentTrackIndex].source,
                        provider: this._playlist[this._currentTrackIndex].provider,
                    },
                ],
            };
        }
        this._player.pause();
        return Promise.resolve(true);
    }
}
