import React, {useCallback, useEffect, useState} from 'react';
import { useEmit, useEventrixState } from 'eventrix/react';
import classnames from 'classnames';
import HistoryIcon from '@material-ui/icons/History';
import RefreshIcon from '@material-ui/icons/Refresh';
import ReceiverIcon from '@material-ui/icons/SettingsInputAntenna';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';

import { RECEIVERS_FETCH } from "../../events";
import Button from "../../components/Button";
import ModuleHeader from "../../components/ModuleHeader";
import AutoRefreshModeButton from "../../components/AutoRefreshModeButton";
import styles from './Receivers.scss';

const Receivers = () => {
    const emit = useEmit();
    const [stateHistory = []] = useEventrixState('receivers');
    const [currentState, setCurrentState] = useState();
    const fetchReceivers = useCallback(() => { emit(RECEIVERS_FETCH) }, [emit]);
    useEffect(() => { fetchReceivers() }, [fetchReceivers]);
    return (
        <div className={styles.moduleContainer}>
            <ModuleHeader icon={<HistoryIcon fontSize="medium"/>} title="State history">
                <AutoRefreshModeButton type="receivers" />
                <Button onClick={fetchReceivers} kind="secondary">
                    <RefreshIcon fontSize="small" /> Reload receivers
                </Button>
            </ModuleHeader>
            <div className={styles.moduleContent}>
                <div className={styles.list}>
                    {stateHistory.map((item, index)=> (
                        <div
                            key={index}
                            onClick={() => setCurrentState(item)}
                            className={classnames({
                                [styles.listItem]: true,
                                [styles.activeListItem]: currentState === item,
                            })}
                        >
                            <div className={styles.name}>{item.eventName}</div>
                            <div className={styles.counters}>
                                <Tooltip title="Receivers">
                                    <Chip
                                        icon={<ReceiverIcon />}
                                        size="small"
                                        label={item.count || 0}
                                        variant="outlined"
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.preview}>
                    {currentState &&
                    <div>
                        <h3>{currentState.eventName}</h3>
                        <div className={styles.previewCounters}>
                            <Chip
                                icon={<ReceiverIcon />}
                                label={`Receivers: ${currentState.count || 0}`}
                                variant="outlined"
                            />
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default Receivers;
