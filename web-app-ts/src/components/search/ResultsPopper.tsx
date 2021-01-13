import React from 'react';
import Popper from '@material-ui/core/Popper';
import { SearchResults } from './SearchResults';
import { PlayableTrack } from 'libsamp';

type ResultsPopperProps = {
    id: string;
    anchorElement: HTMLElement;
    visible: boolean;
    searchResults: PlayableTrack[];
};

export const ResultsPopper: React.FC<ResultsPopperProps> = (props) => {
    return (
        <Popper
            id={props.id}
            open={props.visible}
            anchorEl={props.anchorElement}
            style={{ maxHeight: '80%', overflow: 'auto' }}
        >
            <SearchResults trackResults={props.searchResults}></SearchResults>
        </Popper>
    );
};
