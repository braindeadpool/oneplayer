import React, { useContext } from 'react';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

import { useGlobalStore } from '../../context/GlobalState';
import { observer } from 'mobx-react-lite';

export const SliderBar: React.FC = observer(() => {
    const globalStore = useGlobalStore();

    const currentTrackTimeInSeconds = globalStore.player.playbackState.currentTimeInTrackMilliseconds * 1000;
    const currentTrackDurationInSeconds = globalStore.player.playbackState.currentTrackLengthInMilliseconds * 1000;

    return (
        <>
            <Slider
                valueLabelDisplay="on"
                min={0}
                max={currentTrackDurationInSeconds}
                value={currentTrackTimeInSeconds}
            />
        </>
    );
});
