import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useGlobalStore } from '../../context/GlobalState';

type PlaylistItemProps = {
    uniqueID: string;
    trackIndex: number;
    trackName: string;
    isPlaying?: boolean;
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
                <ListItem button key={props.uniqueID} selected={false}>
                    <ListItemText primary={props.trackName}></ListItemText>
                </ListItem>
                <Divider />
            </div>
        );
    }

    return (
        <>
            <ListItem key={props.uniqueID} selected={true}>
                <ListItemText primary={props.trackName}></ListItemText>
            </ListItem>
            <Divider />
        </>
    );
};
