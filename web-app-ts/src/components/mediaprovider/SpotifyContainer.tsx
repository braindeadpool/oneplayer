import React, { useEffect, useState } from 'react';
import { useGlobalStore } from '../../context/GlobalState';
import { observer } from 'mobx-react-lite';
import { ITrackInfo } from 'libsamp';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

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
            .then((currentSpotifyTrackInfo: ITrackInfo) => {
                setImageURL(currentSpotifyTrackInfo.imageURL!);
            });
    });

    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Paper elevation={3}>
                    <div id={props.containerDivID} hidden={isSpotifyDivHidden}>
                        <img src={imageURL} alt="album art" width="auto" height="100%" />
                    </div>
                </Paper>
            </Box>
        </>
    );
});
