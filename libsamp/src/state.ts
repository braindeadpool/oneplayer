import { Playlist } from './interfaces';

export const state = {
    currentPlaylist: new Playlist(),
    currentTrackIndex: 0,
    currentTimeInTrackMilliseconds: 0,
};
