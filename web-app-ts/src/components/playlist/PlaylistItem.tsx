import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useGlobalStore } from '../../context/GlobalState';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

type PlaylistItemProps = {
    uniqueID: string;
    trackIndex: number;
    trackName: string;
    isPlaying?: boolean;
    iconPath?: string;
};

export const PlaylistItem: React.FC<PlaylistItemProps> = (props) => {
    const globalStore = useGlobalStore();

    // If this item is not playing, make it clickable.
    if (!props.isPlaying) {
        return (
            <div
                onClick={() => {
                    globalStore.player.setCurrentTrackIndex(props.trackIndex);
                }}
            >
                <ListItem button key={props.uniqueID} selected={false} alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Media provider icon" src={props.iconPath} />
                    </ListItemAvatar>
                    <ListItemText primary={props.trackName}></ListItemText>
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
