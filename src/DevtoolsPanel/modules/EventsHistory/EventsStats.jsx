import React from 'react';
import { useEventrixState } from 'eventrix';
import classnames from 'classnames';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

import {getEventsEmitStats} from "./helpers";
import styles from './EventsHistory.scss';

const EventsStats = () => {
    const [eventsHistory = []] = useEventrixState('eventsHistory');
    return (
        <div className={styles.stateStats}>
            <h4>Emitted events stats</h4>
            <Divider />
            <div className={classnames(styles.list, styles.statsList)}>
                {getEventsEmitStats(eventsHistory).map((item)=> (
                    <div
                        key={item.name}
                        className={styles.listItem}
                    >
                        <div className={styles.name}>{item.name}</div>
                        <div className={styles.counters}>
                            <Tooltip title="Emitted events quantity">
                                <Chip
                                    icon={<SettingsRemoteIcon />}
                                    size="small"
                                    label={item.count || 0}
                                    variant="outlined"
                                />
                            </Tooltip>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default EventsStats;
