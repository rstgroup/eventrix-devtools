import React, { useCallback } from 'react';
import { useEventrixState } from 'eventrix';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

const Filters = () => {
    const [filters = {}, setFilters] = useEventrixState('eventsHistoryFilters.filters');
    const toggleWithoutSetStateEvents = useCallback(() => {
        const { withoutSetStateEvents } = filters;
        setFilters({ ...filters, withoutSetStateEvents: !withoutSetStateEvents });
    }, [filters.withoutSetStateEvents, setFilters]);
    return (
        <div>
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
        </div>
    )
};

export default Filters;
