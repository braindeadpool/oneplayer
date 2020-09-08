import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilled from '@material-ui/icons/PauseCircleFilled';

import { useGlobalStore } from '../../context/GlobalState';
import { observer } from 'mobx-react-lite';

export const PlayPauseButton: React.FC = observer(() => {
    const globalStore = useGlobalStore();

    const togglePlaying = () => {
        if (globalStore.player.isPlaying) {
            globalStore.player.pause();
        } else {
            globalStore.player.play();
        }
    };

    const isPlaying = globalStore.player.isPlaying;
    return (
        <>
            <IconButton
                onClick={() => {
                    togglePlaying();
                }}
            >
                {isPlaying ? <PauseCircleFilled /> : <PlayCircleFilled />}
            </IconButton>
        </>
    );
});
