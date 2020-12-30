import React from 'react';
import { useGlobalStore } from '../../context/GlobalState';
import { GridList } from '@material-ui/core';
import { ResultItem } from './ResultItem';
import { PlayableTrack } from 'libsamp';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
}));

type SearchResultsProps = {
    trackResults: PlayableTrack[];
};

export const SearchResults: React.FC<SearchResultsProps> = (props) => {
    const globalStore = useGlobalStore();

    const classes = useStyles();

    const isInPlaylist = (track: PlayableTrack) => {
        return globalStore.player.currentPlaylist.tracks.includes(track);
    };

    return (
        <div className={classes.root}>
            <GridList cellHeight={200} className={classes.gridList}>
                {props.trackResults.map((trackResult, index) => (
                    <ResultItem
                        index={index}
                        playableTrack={trackResult}
                        isInPlaylist={isInPlaylist(trackResult)}
                    ></ResultItem>
                ))}
            </GridList>
        </div>
    );
};
