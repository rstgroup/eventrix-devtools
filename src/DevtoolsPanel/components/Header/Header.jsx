import React from 'react';
import {Button, Stack, Typography} from "@mui/material";
import {ClearIcon, RefreshIcon} from "../icons";

const Header = ({ title, icon, resetAction, refreshAction }) => {
    return (
        <Stack display="flex" direction="row" justifyContent="space-between" padding={1}>
            <Stack alignItems="center" direction="row" spacing={1}>
                {icon}
                <Typography variant="h6">{title}</Typography>
            </Stack>
            <Stack direction="row" spacing={2} >
                {!!resetAction && <Button variant="outlined" onClick={resetAction} startIcon={<ClearIcon />}>
                    RESET
                </Button>}
                {!!refreshAction && <Button variant="contained" onClick={refreshAction} startIcon={<RefreshIcon />}>
                    Refresh
                </Button>}
            </Stack>
        </Stack>
    )
};

export default Header;
