import React, { useEffect, useState } from 'react';
import { useGlobalStore } from '../../context/GlobalState';
import { observer } from 'mobx-react-lite';
import { SpotifyTrackInfo } from 'libsamp';
import Box from '@material-ui/core/Box';

type SpotifyContainerProps = {
    containerDivID: string;
};

export const SpotifyContainer: React.FC<SpotifyContainerProps> = observer((props) => {
    const globalStore = useGlobalStore();

    const isSpotifyDivHidden =
        globalStore.player.currentTrack?.IMediaProvider != globalStore.mediaProviders.get('Spotify');

    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        globalStore.metadataProviders
            .get('Spotify')
            ?.getTrackInfo(globalStore.player.currentTrack?.trackInfo.source!)
            .then((currentSpotifyTrackInfo: SpotifyTrackInfo) => {
                setImageURL(currentSpotifyTrackInfo.imageURL!);
            });
    });

    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center">
                <div id={props.containerDivID} hidden={isSpotifyDivHidden}>
                    <img src={imageURL} alt="album art" width="300px" height="auto" />
                </div>
            </Box>
        </>
    );
});
