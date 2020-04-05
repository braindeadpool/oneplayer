import React, {useContext} from 'react';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

import {GlobalStateContext, GlobalDispatchContext} from '../../context/GlobalState';

export const SliderBar: React.FC = () => {
    const globalState = useContext(GlobalStateContext);
    // const globalDispatch = useContext(GlobalDispatchContext);

    const currentTrackNumSeconds = globalState.playbackState.currentTimeinTrackMilliseconds * 1000;
    

    return (
        <>
            <Slider valueLabelDisplay="on" min={0} max={currentTrackNumSeconds} />
        </>
    );
};
