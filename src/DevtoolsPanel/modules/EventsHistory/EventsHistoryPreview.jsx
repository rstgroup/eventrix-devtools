import React from 'react';
import moment from 'moment';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { useEventrixState } from 'eventrix';
import { ObjectInspector } from "react-inspector";
import {IconButton, Paper, Stack, Typography} from "@mui/material";

import {CloseIcon, ListenerIcon, ReceiverIcon, TimeIcon} from "../../components/icons";
import {contentStyles, paperStyles} from "./EventsHistoryPreview.styles";

const EventsHistoryPreview = () => {
    const [currentEvent, setCurrentEvent] = useEventrixState('eventsHistoryPreview');
    if (!currentEvent) {
        return null;
    }
    return (
        <Stack position="relative" height="50px" width="50px">
            <Paper sx={paperStyles}>
                <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" paddingX={2} paddingY={1} paddingLeft={1}>
                    <Stack spacing={1} direction="row" alignItems="center">
                        <IconButton size="small" onClick={() => setCurrentEvent(null)}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="subtitle2">{currentEvent.name}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Chip
                            icon={<Stack><ReceiverIcon width="15px" /></Stack>}
                            label={currentEvent.receiversCount || 0}
                            size="small"
                            variant="outlined"
                        />
                        <Chip
                            icon={<Stack><ListenerIcon width="15px" /></Stack>}
                            label={currentEvent.listenersCount || 0}
                            size="small"
                            variant="outlined"
                        />
                        <Chip
                            icon={<Stack><TimeIcon width="15px" /></Stack>}
                            label={moment(currentEvent.timestamp || 0).format('HH:mm:ss')}
                            size="small"
                            variant="outlined"
                        />
                    </Stack>
                </Stack>
                <Divider />
                <Stack padding={2} sx={contentStyles}>
                    <ObjectInspector data={currentEvent.data} />
                </Stack>
            </Paper>
        </Stack>
    )
};

export default EventsHistoryPreview;
