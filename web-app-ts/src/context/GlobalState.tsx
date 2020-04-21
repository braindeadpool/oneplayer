import React, { createContext, useReducer, Dispatch } from 'react';

import { IGlobalStateContext, Action } from './interfaces';
import { GlobalReducer } from './GlobalReducer';

import { PlaybackState, Player } from 'libsamp';

const initialContextState: IGlobalStateContext = {
    player: new Player(),
};

const initialDispatchContext: Dispatch<Action> = () => {};

// Create the global state context.
export const GlobalStateContext: React.Context<IGlobalStateContext> = createContext(initialContextState);
// Create the global dispatch context.
export const GlobalDispatchContext: React.Context<Dispatch<Action>> = createContext(initialDispatchContext);

type GlobalContextProviderProps = {
    children?: any;
};

// Create a provider component for the global state context.
export const GlobalContextProvider = (props: GlobalContextProviderProps) => {
    const [state, dispatch] = useReducer(GlobalReducer, initialContextState);

    return (
        <GlobalStateContext.Provider value={state}>
            <GlobalDispatchContext.Provider value={dispatch}>{props.children}</GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    );
};
