import * as interfaces from '../src/interfaces';

test('initializing Playlist', () => {
    let newPlaylist = new interfaces.Playlist();
    expect(newPlaylist.size).toBe(0);
    expect(newPlaylist.shouldLoopOver).toBe(false);
});

test('initializing PlayableTrack', () => {
    let newPlayableTrack = new interfaces.PlayableTrack(
        {
            durationInMilliseconds: 100,
        },
        {
            init: () => {
                return false;
            },
        },
    );
    expect(newPlayableTrack.mediaID).toBe(undefined);
    expect(newPlayableTrack.trackInfo.durationInMilliseconds).toBe(100);
    expect(newPlayableTrack.mediaProvider.init()).toBe(false);
});
