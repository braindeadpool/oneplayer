import React from 'react';
import { PlayerIcon } from 'react-player-controls';

export default class PlayerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isPlaying:false};
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
                {playPauseIcon}
                <PlayerIcon.Previous width={32} height={32} style={{ marginRight: 32 }} />
                <PlayerIcon.Next width={32} height={32} style={{ marginRight: 32 }} />
            </div>
        );
    }
}