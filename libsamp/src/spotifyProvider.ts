import { PlayableTrack, MediaProvider } from './interfaces'

const SPOTIFY_DEFAULT_VOLUME = 0.5

export class SpotifyProvider implements MediaProvider {
  player: any
  connectionStatus: boolean

  constructor(accessToken: string) {
    this.player = new Spotify.Player({
      name: 'onePlayer.libSAMP.Spotify',
      getOAuthToken: callback => {
        callback(accessToken)
      },
      volume: SPOTIFY_DEFAULT_VOLUME
    })
    this.connectionStatus = false
  }

  init() {
    // we connect the player to web api.
    this.player.connect().then((success: boolean) => {
      if (success) {
        console.log('The Web Playback SDK successfully connected to Spotify!')
        this.connectionStatus = true
      }
    })
    return this.connectionStatus
  }
}
