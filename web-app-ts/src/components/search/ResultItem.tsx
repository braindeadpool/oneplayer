import React from 'react';
import { useGlobalStore } from '../../context/GlobalState';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from '@material-ui/core';
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

    const trackInfo = props.playableTrack.trackInfo;

    if (props.isInPlaylist) {
        return (
            <>
                <ListItem key={props.index} alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar src={trackInfo.imageURL} alt={trackInfo.trackName} />
                    </ListItemAvatar>
                    <ListItemText primary={trackInfo.trackName} secondary={trackInfo.artistName} />
                    <Icon>
                        <CheckCircleSharpIcon></CheckCircleSharpIcon>
                    </Icon>
                </ListItem>
            </>
        );
    }

    return (
        <>
            <ListItem key={props.index}>
                <ListItemAvatar>
                    <Avatar src={trackInfo.imageURL} alt={trackInfo.trackName} />
                </ListItemAvatar>
                <ListItemText primary={trackInfo.trackName} secondary={trackInfo.artistName} />
                <IconButton
                    aria-label="add-track"
                    onClick={() => {
                        addTrackToPlaylist(props.playableTrack);
                    }}
                >
                    <AddCircleSharpIcon></AddCircleSharpIcon>
                </IconButton>
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
};
