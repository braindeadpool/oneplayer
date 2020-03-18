import React, { createContext, useReducer, Dispatch } from 'react';

import {IGlobalStateContext, Action} from './interfaces';
import {GlobalReducer} from './GlobalReducer';

import { PlaybackState } from '../../../libsamp/src/state';

const initialContextState: IGlobalStateContext = {
    playbackState: new PlaybackState(),
};

const initialDispatchContext: Dispatch<Action> = () => {};


// Create the global state context.
export const GlobalStateContext: React.Context<IGlobalStateContext> = createContext(initialContextState);
// Create the global dispatch context.
export const GlobalDispatchContext: React.Context<Dispatch<Action>> = createContext(initialDispatchContext);

// Create a provider component for the global state context.
export const GlobalContextProvider = (children: any ) => {

    const [state, dispatch] = useReducer(GlobalReducer, initialContextState);

    return (
            <GlobalStateContext.Provider value={state}>
                <GlobalDispatchContext.Provider value={dispatch}>
                {children}
                </GlobalDispatchContext.Provider>
            </GlobalStateContext.Provider>
    );
};
