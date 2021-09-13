import React from 'react';
import { useEventrixState } from 'eventrix';
import classnames from 'classnames';
import ReceiverIcon from '@material-ui/icons/SettingsInputAntenna';
import ListenerIcon from '@material-ui/icons/WifiTethering';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';

import styles from './EventsHistory.scss';

const EventsHistoryList = ({}) => {
    const [eventsHistory = []] = useEventrixState('eventsHistory');
    const [eventsHistoryFilters] = useEventrixState('eventsHistoryFilters');
    const [currentEvent, setCurrentEvent] = useEventrixState('eventsHistoryPreview');
    const list = eventsHistory.filter(item => {
        let matched = true;
        const { search, filters } = eventsHistoryFilters;
        if (filters.withoutSetStateEvents) {
            matched = item.name.indexOf('setState:') !== 0;
        }
        return item.name.toLowerCase().includes(search.toLowerCase()) && matched;
    });
    return (
        <div className={styles.listContent}>
            {list.map((item, index)=> (
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
    )
};

export default EventsHistoryList;
