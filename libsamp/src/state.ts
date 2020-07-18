import { Playlist } from './interfaces';
import { Machine } from 'xstate';

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

export const playerStateMachine = Machine({
    id: 'player',
    type: 'parallel',
    context: {
        currentPlaylist: new Playlist(),
        currentTrackIndex: 0,
        currentTimeInTrackMilliseconds: 0.0,
    },
    states: {
        playlist: {
            initial: 'ready',
            states: {
                ready: {
                    on: {
                        ADD_TRACK: 'addingTrack',
                    },
                },
                addingTrack: {
                    invoke: {
                        id: 'addingTrack',
                        src: (context, event) => {
                            const result = context.currentPlaylist.addTrack(event.track);
                            if (result) {
                                return Promise.resolve(true);
                            } else {
                                return Promise.reject(false);
                            }
                        },
                        onDone: 'ready',
                        onError: 'ready',
                    },
                },
            },
        },
        playback: {
            initial: 'idle',
            states: {
                idle: {
                    on: {
                        LOAD: 'loading',
                    },
                },
                loading: {
                    invoke: {
                        id: 'loadPlayer',
                        src: (context, _) => {
                            if (context.currentTrackIndex >= context.currentPlaylist.tracks.length) {
                                return Promise.reject('empty playlist');
                            }
                            // Playlist has at least one track, so intialize the track at current index.
                            return context.currentPlaylist.tracks[context.currentTrackIndex].mediaProvider.init();
                        },
                        onDone: { target: 'readyForPlayback' },
                        onError: { target: 'idle' },
                    },
                },
                readyForPlayback: {
                    on: {
                        PLAY: 'startPlaying',
                        PAUSE: 'startPausing',
                    },
                },
                startPlaying: {
                    invoke: {
                        id: 'startPlayback',
                        src: (context, _) => {
                            const currentTrack = context.currentPlaylist.tracks[context.currentTrackIndex!];
                            return currentTrack.mediaProvider.play();
                        },
                        onDone: {
                            target: 'playing',
                        },
                        onError: {
                            target: 'failedPlaying',
                        },
                    },
                },
                startPausing: {
                    invoke: {
                        id: 'pausePlayback',
                        src: (context, _) => {
                            const currentTrack = context.currentPlaylist.tracks[context.currentTrackIndex!];
                            return currentTrack.mediaProvider.pause();
                        },
                        onDone: {
                            target: 'paused',
                        },
                        onError: {
                            target: 'failedPausing',
                        },
                    },
                },
                playing: {
                    on: {
                        PAUSE: 'startPausing',
                    },
                },
                paused: {
                    on: {
                        PLAY: 'startPlaying',
                    },
                },
                failedPlaying: {
                    on: {
                        RETRY: 'startPlaying',
                    },
                },
                failedPausing: {
                    on: {
                        RETRY: 'startPausing',
                    },
                },
                finished: {
                    type: 'final',
                },
            },
        },
    },
});
