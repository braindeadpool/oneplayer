/**
 * ITrackInfo describes the playback details and metadata of a particular track.
 *
 * @export
 * @interface ITrackInfo
 */
export interface ITrackInfo {
    durationInMilliseconds: number;
}

/**
 * IIMediaProviderState exposes the relevant state of a single media provider. This is used for sending control signals back to the specific players.
 *
 * @interface IIMediaProviderState
 */
interface IIMediaProviderState {}

/**
 * IMediaProvider is an interface implemented by an SDK or a wrapper around an SDK of every media player supported by libSAMP.
 * IMediaProvider lets libSAMP (and by extension its users) manipulate multiple media sources together as a single state
 * without worrying about the specific internal implementation details.
 *
 * @export
 * @interface IMediaProvider
 */
export interface IMediaProvider {
    /**
     * init() is always called first before actuall using the provider. All the auth and other setup details should happen here.
     * It returns a promise boolean indicating whether the IMediaProvider was successfully initialized.
     *
     * @returns {Promise<boolean>}
     * @memberof IMediaProvider
     */
    init(): Promise<boolean>;

    /**
     * getCurrentState() fetches the current internal state of the player.
     *
     * @returns {Promise<IIMediaProviderState>}
     * @memberof IMediaProvider
     */
    getCurrentState(): Promise<IIMediaProviderState>;

    /**
     * play() resumes the playback from the current track time or starts a new provided track.
     *
     * @param {track} ITrackInfo optionally a new track to play.
     * @returns {Promise<boolean>} indicates whether the play succeeded.
     * @memberof IMediaProvider
     */
    play(track?: ITrackInfo): Promise<boolean>;

    /**
     * pause() pauses the playback at the current track time.
     *
     * @returns {Promise<boolean>} indicates whether the pause succeeded.
     * @memberof IMediaProvider
     */
    pause(): Promise<boolean>;

    /**
     * togglePlayPause() plays/pauses the playback at the current track time.
     *
     * @returns {Promise<boolean>} indicates whether the toggle succeeded.
     * @memberof IMediaProvider
     */
    togglePlayPause(): Promise<boolean>;

    /**
     * seekTo() seeks the current track to the specified time.
     *
     * @param {number} targetTimeInMilliseconds
     * @returns {Promise<number>} the new time position in the current track.
     * @memberof IMediaProvider
     */
    seekTo(targetTimeInMilliseconds: number): Promise<number>;

    /**
     * setVolume() sets the volume betwen 0 and 1.
     *
     * @param {number} targetVolume
     * @returns {Promise<number>}
     * @memberof IMediaProvider
     */
    setVolume(targetVolume: number): Promise<number>;

    /**
     * getVolume() gets the current volume as a number betwen 0 and 1.
     *
     * @returns {Promise<number>} the current volume.
     * @memberof IMediaProvider
     */
    getVolume(): Promise<number>;

    getCurrentTrackTimeInMilliseconds(): Promise<number>;

    setupTrack(track: ITrackInfo | null): Promise<boolean>;
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

    /**
     * addTrack() adds a new {@link PlayableTrack} instance to the end of the playlist.
     *
     * @param {PlayableTrack} track
     * @memberof Playlist
     */
    addTrack(track: PlayableTrack) {
        this._orderedTracks.push(track);
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
     * @param {ITrackInfo} _trackInfo
     * @param {IMediaProvider} _IMediaProvider
     * @param {(string | undefined)} [_mediaID=undefined]
     * @memberof PlayableTrack
     */
    constructor(
        private _trackInfo: ITrackInfo,
        private _IMediaProvider: IMediaProvider,
        private _mediaID: string | undefined = undefined,
    ) {}

    get trackInfo(): ITrackInfo {
        return this._trackInfo;
    }

    get IMediaProvider(): IMediaProvider {
        return this._IMediaProvider;
    }

    get mediaID(): string | undefined {
        return this._mediaID;
    }
}
