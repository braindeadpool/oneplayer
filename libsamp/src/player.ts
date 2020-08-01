import { PlaybackState } from './state';
import { PlayableTrack } from './interfaces';
import { observable } from 'mobx';

/**
 * A source agnostic media player object. It initializes with a playback state and defines the API to manipulate it.
 *
 * @export
 * @class Player
 */
export class Player {
    @observable _playbackState: PlaybackState;
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
        this._playbackState.currentTrack?.IMediaProvider.pause().then(() => {
            this._playbackState.isPlaying = false;
        });
        return this._playbackState.isPlaying;
    }

    // startPlayback() starts the playback loop.
    startPlayback(): boolean {
        // TODO: Implement loop start and event monitoring.
        console.log(this._playbackState);
        this._playbackState.currentTrack?.IMediaProvider.play().then(() => {
            this._playbackState.isPlaying = true;
        });
        return this._playbackState.isPlaying;
    }

    get playbackState() {
        return this._playbackState;
    }

    addPlayableTrack(playableTrack: PlayableTrack) {
        this._playbackState.currentPlaylist.addTrack(playableTrack);
        // If playlist was empty, set the first track to play.
        if (this._playbackState.currentPlaylist.size == 1) {
            this._playbackState.setCurrentTrackIndex(0);
        }
    }
}
