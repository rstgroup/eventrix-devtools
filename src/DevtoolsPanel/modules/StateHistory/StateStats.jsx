import React from 'react';
import Chip from '@mui/material/Chip';
import { useEventrixState } from 'eventrix';
import Tooltip from '@mui/material/Tooltip';
import {Stack, Typography} from "@mui/material";

import { getStateUpdateStats } from "./helpers";
import {RefreshIcon} from "../../components/icons";

const wrapperStyles = {
    width: "100%",
    height: "calc(100vh - 145px)",
    overflowX: "auto"
}

const StateStats = () => {
    const [stateHistory = []] = useEventrixState('stateHistory');
    return (
        <Stack direction="column" sx={wrapperStyles}>
            {getStateUpdateStats(stateHistory).map((item)=> (
                <Stack
                    key={item.stateName}
                    direction="row"
                    justifyContent="space-between"
                    padding={1}
                >
                    <Typography variant="body2">{item.stateName}</Typography>
                    <Stack direction="row" spacing={1}>
                        <Tooltip title="State update quantity">
                            <Chip
                                icon={<Stack><RefreshIcon width="15px" /></Stack>}
                                size="small"
                                label={item.count || 0}
                                variant="outlined"
                            />
                        </Tooltip>
                    </Stack>
                </Stack>
            ))}
        </Stack>
    );
};

export default StateStats;
