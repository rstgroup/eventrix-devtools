import React from 'react';
import { useEventrixState } from 'eventrix';
import classnames from 'classnames';
import RefreshIcon from '@material-ui/icons/Refresh';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

import styles from './StateHistory.scss';
import { getStateUpdateStats } from "./helpers";

const StateStats = () => {
    const [stateHistory = []] = useEventrixState('stateHistory');
    return (
        <div className={styles.stateStats}>
            <h4>States update stats</h4>
            <Divider />
            <div className={classnames(styles.list, styles.statsList)}>
                {getStateUpdateStats(stateHistory).map((item)=> (
                    <div
                        key={item.name}
                        className={styles.listItem}
                    >
                        <div className={styles.name}>{item.stateName}</div>
                        <div className={styles.counters}>
                            <Tooltip title="State update quantity">
                                <Chip
                                    icon={<RefreshIcon />}
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

export default StateStats;
