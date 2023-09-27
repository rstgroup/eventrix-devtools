import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button, Stack} from "@mui/material";

const useClickOutsideListener = (ref, callback) => {
    const clickOutsideListener = useCallback((e) => {
        if(!ref.current.contains(e.target)) {
            callback();
        }
    }, [ref, callback]);

    useEffect(() => {
        window.addEventListener('click', clickOutsideListener);
        return () => {
            window.removeEventListener('click', clickOutsideListener);
        }
    }, [clickOutsideListener, ref]);
}

const dropdownStyles = (theme) => ({
    position: "absolute",
    top: "calc(100% + 10px)",
    background: theme.palette.background.paper,
    width: "250px",
    maxWidth: theme.breakpoints.between('xs', 'md') ? "calc(100vw - 150px)" : "calc(100vw - 360px)",
    padding: 1,
    borderRadius: 1,
    boxShadow: 1,
    right: 0,
    zIndex: 1,
});

const Dropdown = ({ children }) => {
    const [isFilterTooltipOpened, setFiltersTooltipOpened] = useState(false);
    const filtersRef = useRef();

    const toggleFiltersTooltip = useCallback(() => {
        setFiltersTooltipOpened(!isFilterTooltipOpened);
    }, [isFilterTooltipOpened, setFiltersTooltipOpened]);

    useClickOutsideListener(filtersRef, () => {
        setFiltersTooltipOpened(false);
    });

    return (
        <Stack position="relative" direction="row" alignItems="center" ref={filtersRef}>
            <Button variant="contained" onClick={toggleFiltersTooltip}>Filters</Button>
            {isFilterTooltipOpened &&
                <Stack sx={dropdownStyles}>
                    {children}
                </Stack>
            }
        </Stack>
    );
}

export default Dropdown;
