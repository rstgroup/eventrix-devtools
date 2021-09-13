import React from 'react';
import { useEventrixState } from 'eventrix';
import moment from 'moment';
import ObjectInspector from "react-object-inspector";
import ReceiverIcon from '@material-ui/icons/SettingsInputAntenna';
import ListenerIcon from '@material-ui/icons/WifiTethering';
import TimeIcon from '@material-ui/icons/Schedule';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

import styles from './EventsHistory.scss';

const EventsHistoryPreview = () => {
    const [currentEvent] = useEventrixState('eventsHistoryPreview');
    return (
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
    )
};

export default EventsHistoryPreview;
