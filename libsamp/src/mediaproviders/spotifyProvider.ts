import { IMediaProvider } from '../interfaces';
import { Spotify } from 'spotify';

const SPOTIFY_DEFAULT_VOLUME = 0.5;

export class SpotifyProvider implements IMediaProvider {
    player: any;
    connectionStatus: boolean;

    constructor(accessToken: string) {
        this.player = new Spotify.Player({
            name: 'onePlayer.libSAMP.Spotify',
            getOAuthToken: (callback) => {
                callback(accessToken);
            },
            volume: SPOTIFY_DEFAULT_VOLUME,
        });
        this.connectionStatus = false;
    }

    init() {
        // we connect the player to web api.
        this.player.connect().then((success: boolean) => {
            if (success) {
                console.log('The Web Playback SDK successfully connected to Spotify!');
                this.connectionStatus = true;
            }
        });

        // TODO: Setup event handling logic.
        return this.connectionStatus;
    }
}
