import React, { useCallback } from 'react';
import { useEventrixState } from 'eventrix';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import {Stack} from "@mui/material";

const Filters = () => {
    const [filters = {}, setFilters] = useEventrixState('eventsHistoryFilters.filters');
    const toggleWithoutSetStateEvents = useCallback(() => {
        const { withoutSetStateEvents } = filters;
        setFilters({ ...filters, withoutSetStateEvents: !withoutSetStateEvents });
    }, [filters.withoutSetStateEvents, setFilters]);
    return (
        <Stack>
            <Tooltip title="Hide events emitted from eventrix stateManager ( setState:* )">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.withoutSetStateEvents}
                            onChange={toggleWithoutSetStateEvents}
                            name="withoutSetStateEvents"
                            color="primary"
                        />
                    }
                    label="without set state events"
                />
            </Tooltip>
        </Stack>
    )
};

export default Filters;
