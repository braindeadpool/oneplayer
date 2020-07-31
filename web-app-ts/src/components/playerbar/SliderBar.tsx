import React, { useContext } from 'react';
import { useMachine } from '@xstate/react';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

import { GlobalStateContext } from '../../context/GlobalState';

export const SliderBar: React.FC = () => {
    const globalState = useContext(GlobalStateContext);
    const [current] = useMachine(globalState);

    const currentTrackTimeInSeconds = current.context.currentTimeInTrackMilliseconds * 1000;
    const currentTrackDurationInSeconds = current.context.currentTrackLengthInMilliseconds * 1000;

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
