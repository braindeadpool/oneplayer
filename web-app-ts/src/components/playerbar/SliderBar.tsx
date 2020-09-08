import React, { useContext } from 'react';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

import { useGlobalStore } from '../../context/GlobalState';
import { observer } from 'mobx-react-lite';

export const SliderBar: React.FC = observer(() => {
    const globalStore = useGlobalStore();

    let currentTrackTimeInSeconds = Math.floor(globalStore.player.currentTrackTimeInMilliseconds / 1000);
    const currentTrack = globalStore.player.currentTrack;
    let currentTrackDurationInSeconds = 0;
    if (currentTrack != null) {
        currentTrackDurationInSeconds = Math.floor(currentTrack.trackInfo.durationInMilliseconds / 1000);
    }

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
