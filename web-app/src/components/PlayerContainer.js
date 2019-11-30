import React from 'react';
import { PlayerIcon } from 'react-player-controls';
import { ProgressBar } from './ProgressBar';
import { YoutubeIntegration } from './PlayerIntegrations';
import {SpotifyIntegration} from '../spotify/integration';

export default class PlayerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            currentTimeMilliseconds: 0,
            songDurationMilliseconds: 0,
            bufferedMilliseconds: 0,
        };
    }

    render() {
        let playPauseIcon;
        if (this.state.isPlaying) {
            playPauseIcon = <PlayerIcon.Pause width={32} height={32} style={{ marginRight: 32 }} />;
        } else {
            playPauseIcon = <PlayerIcon.Play width={32} height={32} style={{ marginRight: 32 }} />;
        }
        return (
            <div>
                <SpotifyIntegration />
                <YoutubeIntegration />
                <ProgressBar amountBuffered={this.state.bufferedMilliseconds / this.state.songDurationMilliseconds} currentTime={this.state.currentTimeMilliseconds * 1000} duration={this.state.songDurationMilliseconds * 1000} /><br />
                {playPauseIcon}
                <PlayerIcon.Previous width={32} height={32} style={{ marginRight: 32 }} />
                <PlayerIcon.Next width={32} height={32} style={{ marginRight: 32 }} />
            </div>
        );
    }
}