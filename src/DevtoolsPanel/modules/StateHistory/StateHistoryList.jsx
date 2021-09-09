import React from 'react';
import { useEventrixState } from 'eventrix';
import classnames from 'classnames';
import ReceiverIcon from '@material-ui/icons/SettingsInputAntenna';
import ListenerIcon from '@material-ui/icons/WifiTethering';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';

import styles from './StateHistory.scss';

const StateHistoryList = ({}) => {
    const [stateHistory = []] = useEventrixState('stateHistory');
    const [stateHistoryFilters] = useEventrixState('stateHistoryFilters');
    const [currentState, setCurrentState] = useEventrixState('stateHistoryPreview');
    const list = stateHistory.filter((item) => {
        const { search } = stateHistoryFilters;
        return item.path.includes(search);
    });
    return (
        <div className={styles.listContent}>
            {list.map((item, index)=> (
                <div
                    key={index}
                    onClick={() => setCurrentState(item)}
                    className={classnames({
                        [styles.listItem]: true,
                        [styles.activeListItem]: currentState === item,
                    })}
                >
                    <div className={styles.name}>{item.path}</div>
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

export default StateHistoryList;
