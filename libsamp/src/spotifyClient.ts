import { PlaybackClient, TrackListing } from './interfaces'

const DEFAULT_VOLUME = 0.5

export class SpotifyClient implements PlaybackClient {
  player: any
  constructor(accessToken: string) {
    this.player = new Spotify.Player({
      name: 'onePlayer.libSAMP.Spotify',
      getOAuthToken: callback => {
        callback(accessToken)
      },
      volume: DEFAULT_VOLUME
    })
  }

  search(query: string): TrackListing[] {
    return Array<TrackListing>()
  }

  play(trackListing: TrackListing): boolean {
    return false
  }

  pause(): boolean {
    return false
  }
}
