import { observable } from 'mobx';
import { Playlist } from './interfaces';

export class PlaybackState {
    @observable currentPlaylist: Playlist;
    @observable currentTrackIndex: number = -1;
    @observable currentTimeInTrackMilliseconds: number = 0.0;
    @observable isPlaying: boolean = false;

    constructor(
        currentPlaylist: Playlist = new Playlist(),
        currentTrackIndex: number = -1,
        currentTimeInTrackMilliseconds: number = 0.0,
    ) {
        this.currentPlaylist = currentPlaylist;
        this.currentTrackIndex = currentTrackIndex;
        this.currentTimeInTrackMilliseconds = currentTimeInTrackMilliseconds;
        this.isPlaying = false; // always initialized as false
    }

    previous() {
        if (this.currentPlaylist.size < 1) {
            return false;
        }

        if (!this.currentPlaylist.shouldLoopOver && this.currentTrackIndex == 0) {
            return false;
        }

        this.currentTrackIndex += this.currentPlaylist.size - 1;
        this.currentTrackIndex %= this.currentPlaylist.size;
        this.currentTimeInTrackMilliseconds = 0;
        return true;
    }

    next() {
        if (this.currentPlaylist.size < 1) {
            return false;
        }

        if (!this.currentPlaylist.shouldLoopOver && this.currentTrackIndex == this.currentPlaylist.size - 1) {
            return false;
        }

        this.currentTrackIndex += 1;
        this.currentTrackIndex %= this.currentPlaylist.size;
        this.currentTimeInTrackMilliseconds = 0;
        this.currentTrack?.IMediaProvider.setupTrack(this.currentTrack.trackInfo);
        return true;
    }

    setCurrentTrackIndex(index: number) {
        if (index < 0 || index >= this.currentPlaylist.size) {
            return false;
        }
        this.currentTrackIndex = index;
        this.currentTimeInTrackMilliseconds = 0;
        return true;
    }

    get currentTrackLengthInMilliseconds() {
        if (this.currentTrack != null) {
            return this.currentTrack.trackInfo.durationInMilliseconds;
        }
        return 0;
    }

    get currentTrack() {
        if (this.currentPlaylist.size > 0) {
            return this.currentPlaylist.tracks[this.currentTrackIndex];
        }
        return null;
    }

    hasCurrentTrackFinished() {
        return this.currentTimeInTrackMilliseconds >= this.currentTrackLengthInMilliseconds;
    }
}
