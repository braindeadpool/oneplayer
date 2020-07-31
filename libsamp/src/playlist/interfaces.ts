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

    get mediaProvider(): IMediaProvider {
        return this._IMediaProvider;
    }

    get mediaID(): string | undefined {
        return this._mediaID;
    }
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
    addTrack(track: PlayableTrack): boolean {
        this._orderedTracks.push(track);
        return true;
    }
}
