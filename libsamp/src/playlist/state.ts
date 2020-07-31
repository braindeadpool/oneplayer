import { Playlist } from './interfaces';
import { statemachine } from 'overmind';

export type State =
    | {
          state: 'READY';
          currentPlaylist: Playlist;
      }
    | {
          state: 'ADDING_TRACK';
          currentPlaylist: Playlist;
      };

export const state = statemachine<State>(
    { READY: ['ADDING_TRACK'], ADDING_TRACK: ['READY'] },
    {
        state: 'READY',
        currentPlaylist: new Playlist(),
    },
);
