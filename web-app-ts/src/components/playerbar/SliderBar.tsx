import React, { useContext } from 'react';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

import { GlobalStateContext } from '../../context/GlobalState';

export const SliderBar: React.FC = () => {
    const globalState = useContext(GlobalStateContext);
    // const globalDispatch = useContext(GlobalDispatchContext);

    const currentTrackTimeInSeconds = globalState.player.playbackState.currentTimeInTrackMilliseconds * 1000;
    const currentTrackDurationInSeconds = globalState.player.playbackState.currentTrackLengthInMilliseconds * 1000;

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
};
