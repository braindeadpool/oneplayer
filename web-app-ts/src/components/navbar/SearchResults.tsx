import React from 'react';
import { useGlobalStore } from '../../context/GlobalState';
import List from '@material-ui/core/List';
import { ResultItem } from './ResultItem';
import { PlayableTrack } from 'libsamp';
import { getIconPathFromMediaProvider } from '../../utils';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
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
        <List className={classes.root} style={{ maxHeight: '80%', overflow: 'auto' }}>
            {props.trackResults.map((trackResult, index) => (
                <ResultItem
                    index={index}
                    playableTrack={trackResult}
                    isInPlaylist={isInPlaylist(trackResult)}
                    mediaProviderIconPath={getIconPathFromMediaProvider(trackResult.IMediaProvider.name)}
                ></ResultItem>
            ))}
        </List>
    );
};
