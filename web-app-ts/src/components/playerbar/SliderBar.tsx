import React from 'react';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

export const SliderBar: React.FC = () => {
    const [progressFraction, setProgressFraction] = React.useState<number>(0);

    //TODO: Compute the actual time elapsed and time remaning by using current track time from global state
    const currentTrackNumSeconds = 1;
    
    const minValue = 0;
    const maxValue = currentTrackNumSeconds;

    return (
        <>
            <Slider defaultValue={progressFraction * maxValue} valueLabelDisplay="on" min={0} max={1} />
        </>
    );
};
