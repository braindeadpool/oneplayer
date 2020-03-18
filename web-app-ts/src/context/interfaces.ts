import { PlaybackState } from '../../../libsamp/src/state';

export type Action = {
    type: 'play' | 'pause' | 'next' | 'previous' | null;
    // TODO: Change payload type to be stricter once all required actions are mapped out.
    payload: any;
}


export interface IGlobalStateContext {
    playbackState: PlaybackState;
}

