export interface MediaProvider {
    /* init() is always called first before actuall using the provider. All the auth and other setup details should happen here.
     It returns whether the MediaProvider was successfully initialized. 
  */
    init(): boolean;
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
