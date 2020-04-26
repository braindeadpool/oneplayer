import { PlaybackState } from './state';

/**
 * MediaProviderState exposes the relevant state of a single media provider. This is used for sending control signals back to the specific players.
 *
 * @interface MediaProviderState
 */
interface MediaProviderState {
    currentTrackIndex: number;
    currentTrackTimeMilliseconds: number;
}

/**
 * MediaProvider is an interface implemented by an SDK or a wrapper around an SDK of every media player supported by libSAMP.
 * MediaProvider lets libSAMP (and by extension its users) manipulate multiple media sources together as a single state
 * without worrying about the specific internal implementation details.
 *
 * @export
 * @interface MediaProvider
 */
export interface MediaProvider {
    /**
     * init() is always called first before actuall using the provider. All the auth and other setup details should happen here.
     * It returns a promise boolean indicating whether the MediaProvider was successfully initialized.
     *
     * @returns {Promise<boolean>}
     * @memberof MediaProvider
     */
    init(): Promise<boolean>;

    getCurrentState(): Promise<MediaProviderState>;

    /**
     * play() starts the playback from the current track time and returns a promise indicating whether it succeeded in playing.
     *
     * @returns {Promise<boolean>}
     * @memberof MediaProvider
     */
    play(): Promise<boolean>;

    /**
     * pause() pauses the playback at the current track time and returns a promise indicating whether it succeeded in pausing.
     *
     * @returns {Promise<boolean>}
     * @memberof MediaProvider
     */
    pause(): Promise<boolean>;

    /**
     * togglePlayPause() plays/pauses the playback at the current track time and returns a promise indicating whether it succeeded in toggling.
     *
     * @returns {Promise<boolean>}
     * @memberof MediaProvider
     */
    togglePlayPause(): Promise<boolean>;

    seek(): Promise<number>;

    setVolume(): Promise<number>;

    getVolume(): Promise<number>;

    next(): Promise<boolean>;

    previous(): Promise<boolean>;

    goToIndex(index: number): Promise<boolean>;
}

/**
 * TrackInfo describes the playback details and metadata of a particular track.
 *
 * @export
 * @interface TrackInfo
 */
export interface TrackInfo {
    durationInMilliseconds: number;
}

/**
 * Playlist is a container of ordered list of {@link PlayableTrack} objects.
 *
 * @export
 * @class Playlist
 */
export class Playlist {
    constructor(private _orderedTracks: PlayableTrack[] = [], public shouldLoopOver: boolean = false) {}

    get size(): number {
        return this._orderedTracks.length;
    }

    get tracks(): PlayableTrack[] {
        return this._orderedTracks;
    }
}

/**
 * A source agnostic media track that can be played by libSAMP.
 *
 * @export
 * @class PlayableTrack
 */
export class PlayableTrack {
    /**
     * Creates an instance of PlayableTrack.
     * @param {TrackInfo} _trackInfo
     * @param {MediaProvider} _mediaProvider
     * @param {(string | undefined)} [_mediaID=undefined]
     * @memberof PlayableTrack
     */
    constructor(
        private _trackInfo: TrackInfo,
        private _mediaProvider: MediaProvider,
        private _mediaID: string | undefined = undefined,
    ) {}

    get trackInfo(): TrackInfo {
        return this._trackInfo;
    }

    get mediaProvider(): MediaProvider {
        return this._mediaProvider;
    }

    get mediaID(): string | undefined {
        return this._mediaID;
    }
}
