import React, { useEffect, useState } from 'react';
import { useGlobalStore } from '../../context/GlobalState';
import { observer } from 'mobx-react-lite';
import { SpotifyTrackInfo } from 'libsamp';

type SpotifyContainerProps = {
    containerDivID: string;
};

export const SpotifyContainer: React.FC<SpotifyContainerProps> = observer((props) => {
    const globalStore = useGlobalStore();

    const isSpotifyDivHidden =
        globalStore.player.currentTrack?.IMediaProvider != globalStore.mediaProviders.get('Spotify');

    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        globalStore.metadataAPIs
            .get('Spotify')
            ?.getTrackInfo(globalStore.player.currentTrack?.trackInfo.source!)
            .then((currentSpotifyTrackInfo) => {
                setImageURL((currentSpotifyTrackInfo as SpotifyTrackInfo).imageURL);
            });
    });

    return (
        <>
            <div id={props.containerDivID} hidden={isSpotifyDivHidden}>
                <img src={imageURL} alt="album art" width="300px" height="auto" />
            </div>
        </>
    );
});
