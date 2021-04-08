import React, {useCallback, useEffect, useState} from 'react';
import { useEmit, useEventrixState } from 'eventrix/react';
import styles from './EventsHistory.scss';
import { EVENTS_HISTORY_FETCH } from "../../events";
import ObjectInspector from "react-object-inspector";
import RefreshIcon from '@material-ui/icons/Refresh';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Button from "../../components/Button";
import ModuleHeader from "../../components/ModuleHeader";

const EventsHistory = () => {
    const emit = useEmit();
    const [eventsHistory = []] = useEventrixState('eventsHistory');
    const [currentEvent, setCurrentEvent] = useState();
    const fetchHistory = useCallback(() => { emit(EVENTS_HISTORY_FETCH) }, [emit]);
    const getClassName = useCallback((quantity) => quantity > 0 ? styles.greenCircle : styles.redCircle, []);
    useEffect(() => { fetchHistory() }, [fetchHistory]);
    return (
        <div className={styles.moduleContainer}>
            <ModuleHeader icon={<DateRangeIcon fontSize="medium"/>} title="Events history">
                <Button onClick={fetchHistory} kind="secondary">
                    <RefreshIcon fontSize="small" /> Reload history
                </Button>
            </ModuleHeader>
            <div className={styles.moduleContent}>
                <div className={styles.list}>
                {eventsHistory.map((item, index)=> (
                    <div key={index} onClick={() => setCurrentEvent(item)} className={styles.listItem}>
                        <div className={styles.name}>{item.name}</div>
                        <div className={getClassName(item.receiversCount)}>{item.receiversCount}</div>
                        <div className={getClassName(item.listenersCount)}>{item.listenersCount}</div>
                    </div>
                ))}
                </div>
                <div className={styles.preview}>
                    {currentEvent &&
                        <div>
                            <h3>{currentEvent.name}</h3>
                            <div className={styles.counters}>
                                <div>Receivers: {currentEvent.receiversCount}</div>
                                <div>Listeners: {currentEvent.listenersCount}</div>
                            </div>
                            <ObjectInspector data={currentEvent.data} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default EventsHistory;
