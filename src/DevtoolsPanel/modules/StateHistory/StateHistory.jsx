import React, {useEffect} from 'react';
import SearchBox from "../../components/SearchBox";
import {List, ListItem, ListItemButton, Stack} from "@mui/material";
import {useEventrixState} from "eventrix";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import {ListenerIcon, ReceiverIcon} from "../../components/icons";
import ListItemText from "@mui/material/ListItemText";

const StateHistory = ({ fetchStateHistory }) => {
    const [stateHistory = []] = useEventrixState('stateHistory');
    const [stateHistoryFilters] = useEventrixState('stateHistoryFilters');
    const [selectedItem, setItem] = useEventrixState('stateHistoryPreview');
    const list = stateHistory.filter((item) => {
        const { search } = stateHistoryFilters;
        return item.path.toLowerCase().includes(search.toLowerCase());
    });
    useEffect(() => {
        fetchStateHistory();
    }, [fetchStateHistory]);
    return (
        <Stack width="100%" direction="column" >
            <SearchBox label="State path" filtersStateName="stateHistoryFilters" />
            <Stack sx={{ maxHeight: "calc(100vh - 126px)", overflowX: "auto" }}>
                <List>
                    {list.map((item, index) => (
                        <ListItem
                            key={index}
                            onClick={() => setItem(item)}
                            disablePadding
                        >
                            <ListItemButton selected={selectedItem === item}>
                                <ListItemText primary={item.path} />
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

export default StateHistory;
