import { Reducer } from 'react';
import { IglobalStoreContext, Action } from './interfaces';

// GlobalReducer updates the playback state depending on the action and returns it.
export const GlobalReducer: Reducer<IglobalStoreContext, Action> = (state, action) => {
    switch (action.type) {
        case 'previous':
            state.player.previous();
            break;
        case 'next':
            state.player.next();
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
