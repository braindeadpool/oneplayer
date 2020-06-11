import { Reducer } from 'react';
import { IGlobalStateContext, Action } from './interfaces';

// GlobalReducer updates the playback state depending on the action and returns it.
export const GlobalReducer: Reducer<IGlobalStateContext, Action> = (state, action) => {
    switch (action.type) {
        case 'previous':
            state.player.playbackState.previous();
            break;
        case 'next':
            state.player.playbackState.next();
            break;
        case 'addTrack':
            console.log('addTrack dispatch');
            state.player.addPlayableTrack(action.payload);
            break;
        case 'play':
            console.log('play dispatch');
            state.player.play();
            break;
        case 'pause':
            console.log('pause dispatch');
            state.player.pause();
            break;
        default:
            break;
    }
    return state;
};
