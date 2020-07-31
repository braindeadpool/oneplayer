import React, { createContext } from 'react';

import { createPlayerStateMachine } from 'libsamp';

import { useMachine } from '@xstate/react';

// Create the global state context.
export const GlobalStateContext = createContext(null as any);

type GlobalContextProviderProps = {
    children?: any;
};

// Create a provider component for the global state context.
export const GlobalContextProvider = (props: GlobalContextProviderProps) => {
    const machineInstance = useMachine(createPlayerStateMachine('default_player'));

    return <GlobalStateContext.Provider value={machineInstance}>{props.children}</GlobalStateContext.Provider>;
};
