import { Playlist } from './interfaces';

export class PlaybackState {
    constructor(
        public currentPlaylist: Playlist = new Playlist(),
        public currentTrackIndex: number = -1,
        public currentTimeInTrackMilliseconds: number = 0.0,
        public isPlaying: boolean = false,
    ) {}

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
