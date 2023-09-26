import React from 'react';
import SearchField from "./SearchField";
import {Stack} from "@mui/material";
import Dropdown from "../Dropdown/Dropdown";

const SearchBox = ({ placeholder, filtersStateName, label, filters: FilterComponent }) => {
    return (
        <Stack spacing={1} direction="row" alignItems="center">
            <SearchField label={label} filtersStateName={filtersStateName} />
            {FilterComponent ?
                <Dropdown>
                    <FilterComponent filtersStateName={filtersStateName} />
                </Dropdown>
                : null
            }
        </Stack>
    )
};

export default SearchBox;
