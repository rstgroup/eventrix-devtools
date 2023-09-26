import React, {useCallback, useEffect} from 'react';
import { useEmit, useEventrixState } from 'eventrix';
import Tooltip from "@mui/material/Tooltip/Tooltip";
import {Stack, Typography} from "@mui/material";
import Chip from "@mui/material/Chip";
import {ReceiverIcon} from '../../components/icons';
import { ListenerIcon } from '../../components/icons';
import {STATE_LISTENERS_FETCH} from "../../events";

const wrapperStyles = {
    width: "100%",
    height: "calc(100vh - 145px)",
    overflowX: "auto"
}

const StateListenersStats = () => {
    const emit = useEmit();
    const [listenersList = []] = useEventrixState('stateListeners');
    const fetchStateListeners = useCallback(() => { emit(STATE_LISTENERS_FETCH) }, [emit]);

    useEffect(() => {
        fetchStateListeners()
    }, [fetchStateListeners]);

    return (
        <Stack direction="column" sx={wrapperStyles}>
            {listenersList.map((item)=> (
                <Stack
                    key={item.stateName}
                    direction="row"
                    justifyContent="space-between"
                    padding={1}
                >
                    <Typography variant="body2">{item.stateName}</Typography>
                    <Stack direction="row" spacing={1}>
                        <Tooltip title="Receivers">
                            <Chip
                                icon={<Stack><ReceiverIcon width="15px" /></Stack>}
                                size="small"
                                label={item.receivers || 0}
                                variant="outlined"
                            />
                        </Tooltip>
                        <Tooltip title="Listeners">
                            <Chip
                                icon={<Stack><ListenerIcon width="15px" /></Stack>}
                                size="small"
                                label={item.listeners || 0}
                                variant="outlined"
                            />
                        </Tooltip>
                    </Stack>
                </Stack>
            ))}
        </Stack>
    )
};

export default StateListenersStats;
