import React, {useState} from "react";
import {IconButton, Stack, styled, Typography} from "@mui/material";
import {HideStatsIcon, ShowStatsIcon} from "./icons";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

const StyledBoxWrapper = styled('div')(({ theme }) => ({
    position: "relative",
    width: "50px",
    height: "45px",
}));

const StyledBox = styled(Paper)(({ theme, opened }) => ({
    position: "absolute",
    top: 0,
    right: 0,
    width: opened ?
        theme.breakpoints.between('xs', 'md') ? "calc(100vw - 80px)" : "calc(100vw - 230px)" :
        "50px",
    maxWidth: "450px",
    height: opened ? "calc(100vh - 90px)" : "35px",
    padding: 2,
    zIndex: 2
}));
const StatsBox = ({ children, title }) => {
    const [isStatsBoxOpen, setIsStatsBoxOpen] = useState(false);
    return (
        <StyledBoxWrapper>
            <StyledBox opened={isStatsBoxOpen}>
                <Stack spacing={1} width="100%">
                    <Stack direction="row" justifyContent={isStatsBoxOpen ? "space-between" : "center"} paddingX={1} spacing={1} alignItems="center">
                        {isStatsBoxOpen && <Typography variant="subtitle2">{title}</Typography>}
                        <IconButton onClick={() => setIsStatsBoxOpen(!isStatsBoxOpen)}>
                            {isStatsBoxOpen ? <HideStatsIcon /> : <ShowStatsIcon />}
                        </IconButton>
                    </Stack>
                    {isStatsBoxOpen && <>
                        <Divider />
                        {children}
                    </>}
                </Stack>
            </StyledBox>
        </StyledBoxWrapper>
    )
}

export default StatsBox;
