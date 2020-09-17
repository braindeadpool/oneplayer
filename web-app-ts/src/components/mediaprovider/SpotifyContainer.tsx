import React from 'react';
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

    if (!isSpotifyDivHidden) {
        globalStore.metadataAPIs
            .get('Spotify')
            ?.getTrackInfo(globalStore.player.currentTrack?.trackInfo.source!)
            .then((currentSpotifyTrackInfo) => {
                return (
                    <>
                        <div id={props.containerDivID}>
                            <img src={(currentSpotifyTrackInfo as SpotifyTrackInfo).imageURL} />
                        </div>
                    </>
                );
            });
    }

    return (
        <>
            <div id={props.containerDivID} hidden={isSpotifyDivHidden}></div>
        </>
    );
});
