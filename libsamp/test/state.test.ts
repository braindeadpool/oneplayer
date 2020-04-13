import { PlaybackState } from '../src/state';

test('initializing PlaybackState', () => {
    let testPlaybackState = new PlaybackState();
    expect(testPlaybackState.currentTrackIndex).toBe(-1);
    expect(testPlaybackState.setCurrentTrackIndex(0)).toBe(false);
    expect(testPlaybackState.isPlaying).toBe(false);
    expect(testPlaybackState.previous()).toBe(false);
    expect(testPlaybackState.next()).toBe(false);
});
