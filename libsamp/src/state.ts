import { Playlist } from './interfaces';

export class PlaybackState {
    constructor (
        private _currentPlaylist: Playlist = new Playlist(),
        private _currentTrackIndex: number = -1,
        private _currentTimeInTrackMilliseconds: number = 0.0,
        public isPlaying: boolean = false,
    ) {}

    previous () {
        if (this._currentPlaylist.size < 1) {
            return false;
        }

        if (!this._currentPlaylist.shouldLoopOver && this._currentTrackIndex == 0) {
            return false;
        }

        this._currentTrackIndex += this._currentPlaylist.size - 1;
        this._currentTrackIndex %= this._currentPlaylist.size;
        this._currentTimeInTrackMilliseconds = 0;
        return true;
    }

    next () {
        if (this._currentPlaylist.size < 1) {
            return false;
        }

        if (!this._currentPlaylist.shouldLoopOver && this._currentTrackIndex == this._currentPlaylist.size - 1) {
            return false;
        }

        this._currentTrackIndex += 1;
        this._currentTrackIndex %= this._currentPlaylist.size;
        this._currentTimeInTrackMilliseconds = 0;
        return true;
    }

    setCurrentTrackIndex (index: number) {
        if (index < 0 || index >= this._currentPlaylist.size) {
            return false;
        }
        this._currentTrackIndex = index;
        this._currentTimeInTrackMilliseconds = 0;
        return true;
    }

    get currentTrackIndex () {
        return this._currentTrackIndex;
    }

    get currentTimeinTrackMilliseconds () {
        return this._currentTimeInTrackMilliseconds;
    }

    hasCurrentTrackFinished () {
        // TODO: Implement general logic here.
        return false;
    }
}
