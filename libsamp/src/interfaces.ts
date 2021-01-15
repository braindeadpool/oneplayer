import { observable, action } from 'mobx';

/**
 * ITrackInfo describes the playback details and metadata of a particular track.
 *
 * @export
 * @interface ITrackInfo
 */
export interface ITrackInfo {
    source: string;
    durationInMilliseconds: number;
    trackName: string;
    artistName: string;
    imageURL?: string;
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
     * Uniqie name of this media provider.
     *
     * @type {string}
     * @memberof IMediaProvider
     */
    readonly name: string;

    /**
     * Status of the media provider; unless true it's not completed setup.
     *
     * @type {boolean}
     * @memberof IMediaProvider
     */
    readonly isReady: boolean;
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

    makePlayableTrack(trackInfo: ITrackInfo, mediaID: string): PlayableTrack;
}

/**
 * IMetadataProvider is an interface implemented by a specific metadata provider.
 * A metadata provider is similar to media provider in that it is not tightly coupled to anything.
 * It just lets you fetch the metadata for a particular track or search for playable tracks with a query.
 *
 * @export
 * @interface IMetadataProvider
 */
export interface IMetadataProvider {
    getTrackInfo(trackID: string): Promise<ITrackInfo>;
    /**
     * search the metadata provider with a query string for tracks. It returns a set of playable tracks that matches the query.
     *
     * @param {string} query
     * @returns {Promise<PlayableTrack[]>}
     * @memberof IMetadataProvider
     */
    search(query: string): Promise<PlayableTrack[]>;
}

/**
 * Playlist is a container of ordered list of {@link PlayableTrack} objects.
 *
 * @export
 * @class Playlist
 */
export class Playlist {
    @observable private _orderedTracks: PlayableTrack[];
    @observable public shouldLoopOver: boolean;
    constructor(orderedTracks: PlayableTrack[] = [], shouldLoopOver: boolean = false) {
        this._orderedTracks = orderedTracks;
        this.shouldLoopOver = shouldLoopOver;
    }

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
    @action.bound
    addTrack(track: PlayableTrack) {
        this._orderedTracks.push(track);
    }

    toJSON() {
        return {
            tracks: this._orderedTracks,
            shouldLoopOver: this.shouldLoopOver,
        };
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
    constructor(private _trackInfo: ITrackInfo, private _IMediaProvider: IMediaProvider, private _mediaID: string) {}

    get trackInfo(): ITrackInfo {
        return this._trackInfo;
    }

    get IMediaProvider(): IMediaProvider {
        return this._IMediaProvider;
    }

    get mediaID(): string | undefined {
        return this._mediaID;
    }

    toJSON() {
        return {
            trackInfo: this._trackInfo,
            mediaProvider: this._IMediaProvider,
            mediaID: this._mediaID,
        };
    }
}
