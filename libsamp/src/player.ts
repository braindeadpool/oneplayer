import { PlayableTrack } from './interfaces'

export class PlaybackState {
  queue: PlayableTrack[]
  currentTrack: PlayableTrack | undefined
  currentTimeInTrackMilliseconds: number
  isPlaying: boolean

  constructor() {
    this.queue = new Array<PlayableTrack>()
    this.currentTrack = undefined
    this.currentTimeInTrackMilliseconds = 0
    this.isPlaying = false
  }

  hasCurrentTrackFinished(): boolean {
    return (
      this.currentTimeInTrackMilliseconds >=
      this.currentTrack!.trackListing.durationMilliseconds
    )
  }
}

export class Player {
  playbackState: PlaybackState
  constructor() {
    this.playbackState = new PlaybackState()
  }

  play(): boolean {
    if (!this.playbackState.isPlaying) {
      if (
        !this.playbackState.currentTrack ||
        this.playbackState.hasCurrentTrackFinished()
      ) {
        this.playbackState.currentTrack = this.playbackState.queue.shift()
        this.playbackState.currentTimeInTrackMilliseconds = 0
        if (!this.playbackState.currentTrack) {
          return false
        }
      }
      this.playbackState.isPlaying = this.playbackState.currentTrack.play()
    }
    return this.playbackState.isPlaying
  }

  pause(): boolean {
    if (!this.playbackState.isPlaying) {
    }
    return this.playbackState.isPlaying
  }
}
