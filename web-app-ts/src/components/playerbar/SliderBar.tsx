import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { secondsToHHMMSS, getLastValueFromArrayOrValue } from '../../utils';

import { useGlobalStore } from '../../context/GlobalState';
import { observer } from 'mobx-react-lite';

export const SliderBar: React.FC = observer(() => {
    const [mousePressedDown, setMousePressedDown] = useState(false);

    return (
        <div onMouseDown={() => setMousePressedDown(true)} onMouseUp={() => setMousePressedDown(false)}>
            <PlayerBar isMousePressedDown={mousePressedDown}></PlayerBar>
        </div>
    );
});

type PlayerBarProps = {
    isMousePressedDown: boolean;
};

export const PlayerBar: React.FC<PlayerBarProps> = observer(({ isMousePressedDown }) => {
    const globalStore = useGlobalStore();

    let currentTrackTimeInSeconds = Math.floor(globalStore.player.currentTrackTimeInMilliseconds / 1000);
    const currentTrack = globalStore.player.currentTrack;
    let currentTrackDurationInSeconds = 0;
    if (currentTrack != null) {
        currentTrackDurationInSeconds = Math.floor(currentTrack.trackInfo.durationInMilliseconds / 1000);
    }

    // When the bar is being seeked, this is used to update the track value to allow free seek control and to prevent auto update of the track from the player state
    const [dummyValueState, setDummyValueState] = useState(0);

    const marks = [
        {
            value: 0,
            label: '00:00',
        },
        {
            value: currentTrackDurationInSeconds,
            label: secondsToHHMMSS(currentTrackDurationInSeconds),
        },
    ];

    const handleChange = (event: any, newValue: number | number[]) => {
        setDummyValueState(getLastValueFromArrayOrValue(newValue));
    };

    const seekTo = (event: any, value: number | number[]) => {
        globalStore.player.seekTo(getLastValueFromArrayOrValue(value) * 1000);
    };

    if (isMousePressedDown) {
        return (
            <>
                <Slider
                    valueLabelDisplay="on"
                    min={0}
                    max={currentTrackDurationInSeconds}
                    value={dummyValueState}
                    valueLabelFormat={(value) => secondsToHHMMSS(value)}
                    marks={marks}
                    onChange={handleChange}
                />
            </>
        );
    }

    return (
        <>
            <Slider
                valueLabelDisplay="on"
                min={0}
                max={currentTrackDurationInSeconds}
                value={currentTrackTimeInSeconds}
                valueLabelFormat={(value) => secondsToHHMMSS(value)}
                marks={marks}
                onChange={handleChange}
                onChangeCommitted={seekTo}
            />
        </>
    );
});
