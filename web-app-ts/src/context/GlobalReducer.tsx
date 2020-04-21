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
        default:
            break;
    }
    return state;
};
