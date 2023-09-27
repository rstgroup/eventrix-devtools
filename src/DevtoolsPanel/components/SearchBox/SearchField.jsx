import React, {useCallback} from 'react';
import TextField from '@mui/material/TextField';
import {useEventrixState} from "eventrix";

const SearchField = ({ placeholder, filtersStateName, label = 'Search', filters: FilterComponent }) => {
    const [search = '', setSearchFilter] = useEventrixState(`${filtersStateName}.search`);
    const updateSearch = useCallback((e) => {
        setSearchFilter(e.target.value);
    }, [setSearchFilter]);
    return (
        <TextField
            label={label}
            variant="outlined"
            onChange={updateSearch}
            placeholder={placeholder}
            size="small"
            value={search}
            fullWidth
        />
    )
};

export default SearchField;
