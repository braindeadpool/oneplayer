import React, { createContext } from 'react';

import { Player, IMediaProvider } from 'libsamp';
import { useLocalStore } from 'mobx-react-lite';

const createStore = () => {
    return {
        player: new Player(),
        mediaProviders: new Map<string, IMediaProvider>(),
    };
};
type TStore = ReturnType<typeof createStore>;

// Create the global state context.
const globalStoreContext: React.Context<TStore | null> = createContext<TStore | null>(null);

type GlobalStoreContextProviderProps = {
    children?: any;
};

// Create a provider component for the global state context.
export const GlobalStoreContextProvider = (props: GlobalStoreContextProviderProps) => {
    const store = useLocalStore(createStore);

    return <globalStoreContext.Provider value={store}>{props.children}</globalStoreContext.Provider>;
};

export const useGlobalStore = () => {
    const store = React.useContext(globalStoreContext);
    if (!store) {
        // this is especially useful in TypeScript so you don't need to be checking for null all the time
        throw new Error('useStore must be used within a GlobalStoreContextProvider.');
    }
    return store;
};
