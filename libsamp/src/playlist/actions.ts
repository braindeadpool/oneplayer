import { Action } from 'overmind';
import { PlayableTrack } from '../interfaces';

export const addTrack: Action<PlayableTrack> = ({ state, actions }, track: PlayableTrack) => {
    const status = state.currentPlaylist.addTrack(track);
    if (status) {
        actions.playlist.addTrackSucceeded();
    } else {
        actions.playlist.addTrackFailed();
    }
};

export const addTrackSucceeded: Action = () => {
    console.log('track successfully added');
};

export const addTrackFailed: Action = () => {
    console.log('track failed to add');
};
