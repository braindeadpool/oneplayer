import React, { useEffect, useContext } from 'react';
import { useGlobalStore } from '../../context/GlobalState';
import { observer } from 'mobx-react-lite';

type YouTubeContainerProps = {
    containerDivID: string;
    iframeDivID: string;
};

export const YouTubeContainer: React.FC<YouTubeContainerProps> = observer((props) => {
    const globalStore = useGlobalStore();

    const isYouTubeDivHidden =
        globalStore.player.currentTrack?.IMediaProvider != globalStore.mediaProviders.get('YouTube');

    return (
        <>
            <div id={props.containerDivID} hidden={isYouTubeDivHidden}>
                {/* The div below will be replaced by an iframe by the YT IFrame API. */}
                <div id={props.iframeDivID}></div>
            </div>
        </>
    );
});
