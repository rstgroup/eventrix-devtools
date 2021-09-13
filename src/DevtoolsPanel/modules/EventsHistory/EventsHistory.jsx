import React, { useCallback, useEffect } from 'react';
import { useEmit } from 'eventrix';
import RefreshIcon from '@material-ui/icons/Refresh';
import DateRangeIcon from '@material-ui/icons/DateRange';

import { EVENTS_HISTORY_FETCH } from "../../events";
import Button from "../../components/Button";
import ModuleHeader from "../../components/ModuleHeader";
import AutoRefreshModeButton from "../../components/AutoRefreshModeButton";
import styles from './EventsHistory.scss';
import SearchBox from "../../components/SearchBox";
import EventsHistoryList from "./EventsHistoryList";
import EventsHistoryPreview from "./EventsHistoryPreview";
import EventsStats from "./EventsStats";
import Filters from "./Filters";

const EventsHistory = () => {
    const emit = useEmit();
    const fetchHistory = useCallback(() => { emit(EVENTS_HISTORY_FETCH) }, [emit]);
    useEffect(() => { fetchHistory() }, [fetchHistory]);
    return (
        <div className={styles.moduleContainer}>
            <ModuleHeader icon={<DateRangeIcon fontSize="medium"/>} title="Events history">
                <AutoRefreshModeButton type="eventsHistory" />
                <Button onClick={fetchHistory} kind="secondary">
                    <RefreshIcon fontSize="small" /> Reload history
                </Button>
            </ModuleHeader>
            <div className={styles.moduleContent}>
                <div className={styles.list}>
                    <SearchBox
                        label="Event name"
                        filtersStateName="eventsHistoryFilters"
                        filters={Filters}
                    />
                    <EventsHistoryList />
                </div>
                <EventsHistoryPreview />
                <EventsStats />
            </div>
        </div>
    )
};

export default EventsHistory;
