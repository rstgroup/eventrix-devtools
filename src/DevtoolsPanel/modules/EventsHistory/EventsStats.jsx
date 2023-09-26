import React from 'react';
import { useEventrixState } from 'eventrix';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';

import {getEventsEmitStats} from "./helpers";
import {EmitIcon} from "../../components/icons";
import {Stack, Typography} from "@mui/material";

const wrapperStyles = {
    width: "100%",
    height: "calc(100vh - 145px)",
    overflowX: "auto"
}

const EventsStats = () => {
    const [eventsHistory = []] = useEventrixState('eventsHistory');
    return (
        <Stack direction="column" sx={wrapperStyles}>
            {getEventsEmitStats(eventsHistory).map((item) => (
                <Stack
                    key={item.name}
                    direction="row"
                    justifyContent="space-between"
                    padding={1}
                >
                    <Typography variant="body2">{item.name}</Typography>
                    <Stack direction="row" spacing={1}>
                        <Tooltip title="State update quantity">
                            <Chip
                                icon={<Stack><EmitIcon width="15px" /></Stack>}
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

export default EventsStats;
