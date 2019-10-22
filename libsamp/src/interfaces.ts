export interface PlaybackClient {
  search(query: string): TrackListing[]
  play(trackListing: TrackListing): boolean
  pause(): boolean
}

export interface TrackListing {
  id: string
  name: string
  uri: string
  durationMilliseconds: number
}

export class PlayableTrack {
  trackListing: TrackListing
  playbackClient: PlaybackClient
  constructor(trackListing: TrackListing, playbackClient: PlaybackClient) {
    this.trackListing = trackListing
    this.playbackClient = playbackClient
  }
  play(): boolean {
    return this.playbackClient.play(this.trackListing)
  }
}
