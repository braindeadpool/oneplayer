import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useNavBarStyles } from './styles';

interface SearchBarProps {
    placeholder: string;
}

export const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
    const classes = useNavBarStyles();

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder={props.placeholder}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    );
};
