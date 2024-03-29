import { Playlist, PlayableTrack } from './interfaces';

import { observable, action } from 'mobx';

// At what intervals to update the track time.
const TIME_UPDATE_INTERVAL = 100;

/**
 * A source agnostic media player object. It initializes with a playback state and defines the API to manipulate it.
 *
 * @export
 * @class Player
 */
export class Player {
    @observable currentPlaylist: Playlist;
    @observable currentTrackIndex: number = -1;
    @observable isPlaying: boolean = false;
    @observable currentTrackTimeInMilliseconds: number;

    private _timeUpdateInterval: any;

    constructor() {
        this.currentPlaylist = new Playlist();
        this.currentTrackIndex = -1;
        this.isPlaying = false;
        this.currentTrackTimeInMilliseconds = 0;
        this._timeUpdateInterval = null;
    }

    get currentTrack() {
        if (this.currentPlaylist.size > 0) {
            return this.currentPlaylist.tracks[this.currentTrackIndex];
        }
        return null;
    }

    @action.bound
    play() {
        if (this.isPlaying) return;

        this.currentTrack?.IMediaProvider.play().then(() => {
            this.isPlaying = true;
            // setup updating the time if not set already
            if (!this._timeUpdateInterval === null) return;

            this._timeUpdateInterval = setInterval(() => {
                this.currentTrack?.IMediaProvider.getCurrentTrackTimeInMilliseconds().then((value) => {
                    this.currentTrackTimeInMilliseconds = value;
                    if (this.currentTrackTimeInMilliseconds >= this.currentTrack!.trackInfo.durationInMilliseconds) {
                        this.next();
                    }
                });
            }, TIME_UPDATE_INTERVAL);
        });
    }

    @action.bound
    pause() {
        this.currentTrack?.IMediaProvider.pause().then(() => {
            this.isPlaying = false;
        });
    }

    @action.bound
    previous(): boolean {
        if (this.currentPlaylist.size < 1) {
            return false;
        }

        if (!this.currentPlaylist.shouldLoopOver && this.currentTrackIndex == 0) {
            return false;
        }

        this.currentTrackIndex += this.currentPlaylist.size - 1;
        this.currentTrackIndex %= this.currentPlaylist.size;
        this.currentTrackTimeInMilliseconds = 0;

        // if the existing state was playing, then we start the playback of the new track.
        if (this.isPlaying) {
            this.play();
        }

        return true;
    }

    @action.bound
    next(): boolean {
        if (this.currentPlaylist.size < 1) {
            return false;
        }

        if (!this.currentPlaylist.shouldLoopOver && this.currentTrackIndex == this.currentPlaylist.size - 1) {
            return false;
        }

        this.currentTrackIndex += 1;
        this.currentTrackIndex %= this.currentPlaylist.size;
        this.currentTrackTimeInMilliseconds = 0;
        this.currentTrack?.IMediaProvider.setupTrack(this.currentTrack.trackInfo);

        // if the existing state was playing, then we start the playback of the new track.
        if (this.isPlaying) {
            this.play();
        }

        return true;
    }

    @action.bound
    seekTo(timeInMilliseconds: number) {
        if (this.currentTrack == null) return;

        if (timeInMilliseconds < 0 || timeInMilliseconds > this.currentTrack.trackInfo.durationInMilliseconds) return;

        this.currentTrack.IMediaProvider.seekTo(timeInMilliseconds);
    }

    @action.bound
    setCurrentTrackIndex(index: number) {
        if (index < 0 || index >= this.currentPlaylist.size) {
            return false;
        }

        // Save the current playing state to know whether to continue playing the new track or not.
        const wasPlaying = this.isPlaying;
        // pause the current track (this could be from a different provider)
        this.currentTrack?.IMediaProvider.pause();
        this.currentTrackIndex = index;
        this.currentTrack?.IMediaProvider.setupTrack(this.currentTrack.trackInfo);
        // setupTrack always pauses the new track after setup.
        this.isPlaying = false;
        if (wasPlaying) {
            this.play();
        }
        return true;
    }

    @action.bound
    addPlayableTrack(playableTrack: PlayableTrack) {
        this.currentPlaylist.addTrack(playableTrack);
        // If playlist was empty, set the first track to play.
        if (this.currentPlaylist.size == 1) {
            this.setCurrentTrackIndex(0);
        }
    }

    @action.bound
    removeTrackAtIndex(index: number) {
        this.currentPlaylist.removeTrack(index);
        if (index <= this.currentTrackIndex) {
            this.currentTrackIndex -= 1;
        }
    }

    @action.bound
    clearPlaylist() {
        this.currentPlaylist.clear();
    }
}
