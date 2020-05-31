import * as interfaces from '../src/interfaces';

/**
 * getDummyMediaProvider returns a dummy media provider interface implementation.
 *
 */
function getDummyMediaProvider() {
    let dummyMediaProviderState = {
        playlist: Array<interfaces.ITrackInfo>(),
        currentTrackIndex: -1,
        currentTrackTimeMilliseconds: -1,
    };
    return {
        init: () => {
            return Promise.resolve(false);
        },
        getCurrentState: () => {
            return Promise.resolve(dummyMediaProviderState);
        },
        play: () => {
            return Promise.resolve(false);
        },
        pause: () => {
            return Promise.resolve(false);
        },
        togglePlayPause: () => {
            return Promise.resolve(false);
        },
        seek: (_: number) => {
            return Promise.resolve(0);
        },
        setVolume: (_: number) => {
            return Promise.resolve(0);
        },
        getVolume: () => {
            return Promise.resolve(0);
        },
        next: () => {
            return Promise.resolve(dummyMediaProviderState);
        },
        previous: () => {
            return Promise.resolve(dummyMediaProviderState);
        },
        goToIndex: (_: number) => {
            return Promise.resolve(dummyMediaProviderState);
        },
    };
}

function getDummyPlayableTrack() {
    const dummyMediaProvider = getDummyMediaProvider();
    return new interfaces.PlayableTrack(
        {
            durationInMilliseconds: 100,
        },
        dummyMediaProvider,
    );
}

test('initializing Playlist', () => {
    let newPlaylist = new interfaces.Playlist();
    expect(newPlaylist.size).toBe(0);
    expect(newPlaylist.shouldLoopOver).toBe(false);
    const dummyPlayableTrack = getDummyPlayableTrack();
    newPlaylist.addTrack(dummyPlayableTrack);
    expect(newPlaylist.size).toBe(1);
    expect(newPlaylist.tracks[0]).toBe(dummyPlayableTrack);
});

test('initializing PlayableTrack', () => {
    const dummyMediaProvider = getDummyMediaProvider();
    let newPlayableTrack = new interfaces.PlayableTrack(
        {
            durationInMilliseconds: 100,
        },
        dummyMediaProvider,
    );
    expect(newPlayableTrack.mediaID).toBe(undefined);
    expect(newPlayableTrack.trackInfo.durationInMilliseconds).toBe(100);
    newPlayableTrack.IMediaProvider.init().then((data) => {
        expect(data).toBe(false);
    });
});
