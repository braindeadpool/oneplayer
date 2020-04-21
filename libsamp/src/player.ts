import { PlaybackState } from './state';

/**
 * A source agnostic media player object. It initializes with a playback state and defines the API to manipulate it.
 *
 * @export
 * @class Player
 */
export class Player {
    _playbackState: PlaybackState;
    constructor() {
        this._playbackState = new PlaybackState();
        // TODO: Setup event handling logic.
    }

    play(): boolean {
        if (!this._playbackState.isPlaying) {
            if (!this._playbackState.currentTrackIndex || this._playbackState.hasCurrentTrackFinished()) {
                this._playbackState.next();
            }

            this._playbackState.isPlaying = this.startPlayback();
        }
        return this._playbackState.isPlaying;
    }

    pause(): boolean {
        if (!this._playbackState.isPlaying) {
        }
        return this._playbackState.isPlaying;
    }

    // startPlayback() starts the playback loop.
    startPlayback(): boolean {
        // TODO: Implement loop start and event monitoring.
        return false;
    }

    get playbackState() {
        return this._playbackState;
    }
}
