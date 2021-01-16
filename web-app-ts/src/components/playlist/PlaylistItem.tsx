import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useGlobalStore } from '../../context/GlobalState';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp';
import IconButton from '@material-ui/core/IconButton';
import { globalState } from 'mobx/lib/internal';

type PlaylistItemProps = {
    uniqueID: string;
    trackIndex: number;
    trackName: string;
    isPlaying?: boolean;
    iconPath?: string;
};

export const PlaylistItem: React.FC<PlaylistItemProps> = (props) => {
    const globalStore = useGlobalStore();

    const removeTrackAtIndex = (index: number) => {
        if (index == globalStore.player.currentTrackIndex) {
            globalStore.player.pause();
        }

        globalStore.player.removeTrackAtIndex(index);
        localStorage.setItem('currentPlaylist', JSON.stringify(globalStore.player.currentPlaylist));
    };

    // If this item is not playing, make it clickable.
    if (!props.isPlaying) {
        return (
            <div
                onClick={() => {
                    globalStore.player.setCurrentTrackIndex(props.trackIndex);
                    globalStore.player.play();
                }}
            >
                <ListItem button key={props.uniqueID} selected={false} alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Media provider icon" src={props.iconPath} />
                    </ListItemAvatar>
                    <ListItemText primary={props.trackName}></ListItemText>
                    <IconButton
                        aria-label="remove-track"
                        onClick={() => {
                            removeTrackAtIndex(props.trackIndex);
                        }}
                    >
                        <RemoveCircleSharpIcon></RemoveCircleSharpIcon>
                    </IconButton>
                </ListItem>
                <Divider />
            </div>
        );
    }

    return (
        <>
            <ListItem button key={props.uniqueID} selected={true}>
                <ListItemAvatar>
                    <Avatar alt="Media provider icon" src={props.iconPath} />
                </ListItemAvatar>
                <ListItemText primary={props.trackName}></ListItemText>
            </ListItem>
            <Divider />
        </>
    );
};
