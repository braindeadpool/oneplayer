import * as interfaces from '../src/interfaces';

test('initializing playlist', () => {
    let newPlaylist = new interfaces.Playlist();
    expect(newPlaylist.size).toBe(0);
    expect(newPlaylist.shouldLoopOver).toBe(false);
});
