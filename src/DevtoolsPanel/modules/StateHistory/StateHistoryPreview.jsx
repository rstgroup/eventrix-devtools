import React from 'react';
import { useEventrixState } from 'eventrix';
import moment from 'moment';
import ObjectInspector from "react-object-inspector";
import ReceiverIcon from '@material-ui/icons/SettingsInputAntenna';
import ListenerIcon from '@material-ui/icons/WifiTethering';
import TimeIcon from '@material-ui/icons/Schedule';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

import styles from './StateHistory.scss';

const StateHistoryPreview = () => {
    const [currentState] = useEventrixState('stateHistoryPreview');
    return (
        <div className={styles.preview}>
            {currentState &&
            <div>
                <h3>{currentState.path}</h3>
                <div className={styles.previewCounters}>
                    <Chip
                        icon={<ReceiverIcon />}
                        label={`Receivers: ${currentState.receiversCount || 0}`}
                        variant="outlined"
                    />
                    <Chip
                        icon={<ListenerIcon />}
                        label={`Listeners: ${currentState.listenersCount || 0}`}
                        variant="outlined"
                    />
                    <Chip
                        icon={<TimeIcon />}
                        label={`Time: ${moment(currentState.timestamp || 0).format('HH:mm:ss')}`}
                        variant="outlined"
                    />
                </div>
                <Divider />
                <div className={styles.dataPreview}>
                    <ObjectInspector data={currentState.state} />
                </div>
            </div>
            }
        </div>
    )
};

export default StateHistoryPreview;
