import React, { useEffect } from 'react';
import { useEventrixState} from 'eventrix';

import SearchBox from "../../components/SearchBox";
import Filters from "./Filters";
import { ListenerIcon, ReceiverIcon } from "../../components/icons";
import {List, ListItem, ListItemButton, Stack} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";

const EventsHistory = ({ fetchEventsHistory }) => {
    const [eventsHistory = []] = useEventrixState('eventsHistory');
    const [eventsHistoryFilters] = useEventrixState('eventsHistoryFilters');
    const [selectedItem, setItem] = useEventrixState('eventsHistoryPreview');
    const list = eventsHistory.filter(item => {
        let matched = true;
        const { search, filters } = eventsHistoryFilters;
        if (filters.withoutSetStateEvents) {
            matched = item.name.indexOf('setState:') !== 0;
        }
        return item.name.toLowerCase().includes(search.toLowerCase()) && matched;
    });
    useEffect(() => {
        fetchEventsHistory()
    }, [fetchEventsHistory]);
    return (
        <Stack width="100%" direction="column">
            <SearchBox
                label="Event name"
                filtersStateName="eventsHistoryFilters"
                filters={Filters}
            />
            <Stack sx={{ maxHeight: "calc(100vh - 126px)", overflowX: "auto" }}>
                <List>
                    {list.map((item, index) => (
                        <ListItem
                            key={index}
                            onClick={() => setItem(item)}
                            disablePadding
                        >
                            <ListItemButton selected={selectedItem === item}>
                                <ListItemText primary={item.name} />
                                <Stack spacing={1} direction="row">
                                    <Tooltip title="Receivers">
                                        <Chip
                                            icon={<Stack><ReceiverIcon width="15px" /></Stack>}
                                            size="small"
                                            label={item.receiversCount || 0}
                                            variant="outlined"
                                        />
                                    </Tooltip>
                                    <Tooltip title="Listeners">
                                        <Chip
                                            icon={<Stack><ListenerIcon width="15px" /></Stack>}
                                            size="small"
                                            label={item.listenersCount || 0}
                                            variant="outlined"
                                        />
                                    </Tooltip>
                                </Stack>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Stack>
        </Stack>
    )
};

export default EventsHistory;
