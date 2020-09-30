import React from 'react';
import { useGlobalStore } from '../../context/GlobalState';
import { GridListTile, GridListTileBar, Icon } from '@material-ui/core';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import IconButton from '@material-ui/core/IconButton';
import { PlayableTrack } from 'libsamp';

type PlaylistItemProps = {
    index: number;
    isInPlaylist?: boolean;
    playableTrack: PlayableTrack;
};

export const ResultItem: React.FC<PlaylistItemProps> = (props) => {
    const globalStore = useGlobalStore();

    const addTrackToPlaylist = (playableTrack: PlayableTrack) => {
        globalStore.player.currentPlaylist.addTrack(playableTrack);
    };

    if (props.isInPlaylist) {
        return (
            <>
                <GridListTile key={props.index}>
                    <img src={props.playableTrack.imageURL} alt={props.playableTrack.trackName} />
                    <GridListTileBar
                        title={props.playableTrack.trackName}
                        subtitle={props.playableTrack.artistName}
                        actionIcon={
                            <Icon>
                                <CheckCircleSharpIcon></CheckCircleSharpIcon>
                            </Icon>
                        }
                    />
                </GridListTile>
            </>
        );
    }

    return (
        <>
            <GridListTile key={props.uniqueID}>
                <img src={props.playableTrack.imageURL} alt={props.playableTrack.trackName} />
                <GridListTileBar
                    title={props.playableTrack.trackName}
                    subtitle={props.playableTrack.artistName}
                    actionIcon={
                        <IconButton
                            aria-label="add-track"
                            onClick={() => {
                                addTrackToPlaylist(props.playableTrack);
                            }}
                        >
                            <AddCircleSharpIcon></AddCircleSharpIcon>
                        </IconButton>
                    }
                />
            </GridListTile>
        </>
    );
};
