import { PlaybackState } from './state'

export class Player {
  playbackState: PlaybackState
  constructor() {
    this.playbackState = new PlaybackState()
  }

  play(): boolean {
    if (!this.playbackState.isPlaying) {
      if (
        !this.playbackState.currentTrackIndex ||
        this.playbackState.hasCurrentTrackFinished()
      ) {
        this.playbackState.next()
      }

      this.playbackState.isPlaying = this.startPlayback()
    }
    return this.playbackState.isPlaying
  }

  pause(): boolean {
    if (!this.playbackState.isPlaying) {
    }
    return this.playbackState.isPlaying
  }

  // startPlayback() starts the playback loop.
  startPlayback(): boolean {
    // TODO: Implement loop start and event monitoring.
    return false
  }
}
