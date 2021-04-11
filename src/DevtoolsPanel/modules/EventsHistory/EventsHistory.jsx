import React, {useCallback, useEffect, useState} from 'react';
import { useEmit, useEventrixState } from 'eventrix/react';
import classnames from 'classnames';
import moment from 'moment';
import ObjectInspector from "react-object-inspector";
import HistoryIcon from '@material-ui/icons/History';
import RefreshIcon from '@material-ui/icons/Refresh';
import ReceiverIcon from '@material-ui/icons/SettingsInputAntenna';
import ListenerIcon from '@material-ui/icons/WifiTethering';
import TimeIcon from '@material-ui/icons/Schedule';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';

import Divider from '@material-ui/core/Divider';
import { EVENTS_HISTORY_FETCH } from "../../events";
import Button from "../../components/Button";
import ModuleHeader from "../../components/ModuleHeader";
import AutoRefreshModeButton from "../../components/AutoRefreshModeButton";
import styles from './EventsHistory.scss';


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
                <AutoRefreshModeButton type="eventsHistory" />
                <Button onClick={fetchHistory} kind="secondary">
                    <RefreshIcon fontSize="small" /> Reload history
                </Button>
            </ModuleHeader>
            <div className={styles.moduleContent}>
                <div className={styles.list}>
                    {eventsHistory.map((item, index)=> (
                        <div
                            key={index}
                            onClick={() => setCurrentEvent(item)}
                            className={classnames({
                                [styles.listItem]: true,
                                [styles.activeListItem]: currentEvent === item,
                            })}
                        >
                            <div className={styles.name}>{item.name}</div>
                            <div className={styles.counters}>
                                <Tooltip title="Receivers">
                                    <Chip
                                        icon={<ReceiverIcon />}
                                        size="small"
                                        label={item.receiversCount || 0}
                                        variant="outlined"
                                    />
                                </Tooltip>
                                <Tooltip title="Listeners">
                                    <Chip
                                        icon={<ListenerIcon />}
                                        size="small"
                                        label={item.listenersCount || 0}
                                        variant="outlined"
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.preview}>
                    {currentEvent &&
                    <div>
                        <h3>{currentEvent.name}</h3>
                        <div className={styles.previewCounters}>
                            <Chip
                                icon={<ReceiverIcon />}
                                label={`Receivers: ${currentEvent.receiversCount || 0}`}
                                variant="outlined"
                            />
                            <Chip
                                icon={<ListenerIcon />}
                                label={`Listeners: ${currentEvent.listenersCount || 0}`}
                                variant="outlined"
                            />
                            <Chip
                                icon={<TimeIcon />}
                                label={`Time: ${moment(currentEvent.timestamp || 0).format('HH:mm:ss')}`}
                                variant="outlined"
                            />
                        </div>
                        <Divider />
                        <div className={styles.dataPreview}>
                            <ObjectInspector data={currentEvent.data} />
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default EventsHistory;
