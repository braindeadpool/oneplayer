import { PlaybackState } from './state';
import { PlayableTrack } from './interfaces';

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
        this._playbackState.currentTrack?.mediaProvider.pause().then(() => {
            this._playbackState.isPlaying = false;
        });
        return this._playbackState.isPlaying;
    }

    // startPlayback() starts the playback loop.
    startPlayback(): boolean {
        // TODO: Implement loop start and event monitoring.
        this._playbackState.currentTrack?.mediaProvider.play().then(() => {
            this._playbackState.isPlaying = true;
        });
        return this._playbackState.isPlaying;
    }

    get playbackState() {
        return this._playbackState;
    }

    addPlayableTrack(playableTrack: PlayableTrack) {
        this._playbackState.currentPlaylist.addTrack(playableTrack);
    }
}
