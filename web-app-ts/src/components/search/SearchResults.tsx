import React from 'react';
import { useGlobalStore } from '../../context/GlobalState';
import { GridList } from '@material-ui/core';
import { ResultItem } from './ResultItem';
import { PlayableTrack } from 'libsamp';

type SearchResultsProps = {
    trackResults: PlayableTrack[];
};

export const SearchResults: React.FC<SearchResultsProps> = (props) => {
    const globalStore = useGlobalStore();

    const isInPlaylist = (track: PlayableTrack) => {
        return globalStore.player.currentPlaylist.tracks.includes(track);
    };

    return (
        <>
            <GridList>
                {props.trackResults.map((trackResult, index) => (
                    <ResultItem
                        index={index}
                        playableTrack={trackResult}
                        isInPlaylist={isInPlaylist(trackResult)}
                    ></ResultItem>
                ))}
            </GridList>
        </>
    );
};
