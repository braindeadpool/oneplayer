export interface MediaProvider {
    /* init() is always called first before actuall using the provider. All the auth and other setup details should happen here.
     It returns whether the MediaProvider was successfully initialized. 
  */
    init(): boolean;
}

export class Playlist {
    constructor(private _orderedTracks: PlayableTrack[] = [], public shouldLoopOver: boolean = false) {}

    get size(): number {
        return this._orderedTracks.length;
    }
}

export class PlayableTrack {
    constructor(private _mediaProvider: MediaProvider, private _mediaID: string | undefined = undefined) {}

    get mediaProvider(): MediaProvider {
        return this._mediaProvider;
    }

    get mediaID(): string | undefined {
        return this._mediaID;
    }
}
