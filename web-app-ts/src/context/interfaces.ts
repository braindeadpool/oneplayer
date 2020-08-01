import { Player } from 'libsamp';

export type Action = {
    type: 'play' | 'pause' | 'next' | 'previous' | 'addTrack' | null;
    // TODO: Change payload type to be stricter once all required actions are mapped out.
    payload?: any;
};

export interface IglobalStoreContext {
    player: Player;
}
