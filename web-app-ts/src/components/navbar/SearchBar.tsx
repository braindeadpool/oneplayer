import React, { useState } from 'react';
import { useGlobalStore } from '../../context/GlobalState';
import SearchIcon from '@material-ui/icons/Search';
import { useNavBarStyles } from './styles';
import ESearchBar from 'material-ui-search-bar';
import { SearchResults } from './SearchResults';
import Popper from '@material-ui/core/Popper';
import { PlayableTrack } from 'libsamp';
import { ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
}));

export const SearchBar: React.FC = () => {
    const classes = useNavBarStyles();
    const clickAwayClasses = useStyles();
    const globalStore = useGlobalStore();

    const [searchString, setSearchString] = useState('');
    const [searchResults, setSearchResults] = useState(Array<PlayableTrack>());
    const [showSearchResults, setShowSearchResults] = useState(false);

    const handleSearchRequest = (query: string) => {
        globalStore.searcher.search(query).then((searchResults) => {
            setSearchResults(searchResults);
            setShowSearchResults(true);
        });
    };

    const nowPlayingDivElement = document.getElementById('nowPlayingDiv');

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <ESearchBar
                value={searchString}
                onChange={(newVal) => setSearchString(newVal)}
                onRequestSearch={() => handleSearchRequest(searchString)}
            ></ESearchBar>
            <Popper
                id="searchResults"
                open={showSearchResults}
                anchorEl={nowPlayingDivElement}
                style={{ maxHeight: '80%', overflow: 'auto' }}
            >
                <ClickAwayListener
                    onClickAway={() => {
                        console.log('clicked away');
                        setShowSearchResults(false);
                    }}
                >
                    <div className={clickAwayClasses.root}>
                        <SearchResults trackResults={searchResults}></SearchResults>
                    </div>
                </ClickAwayListener>
            </Popper>
        </div>
    );
};
