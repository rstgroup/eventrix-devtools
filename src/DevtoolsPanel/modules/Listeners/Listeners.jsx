import React, {useCallback, useEffect, useState} from 'react';
import { useEmit, useEventrixState } from 'eventrix/react';
import classnames from 'classnames';
import HistoryIcon from '@material-ui/icons/History';
import RefreshIcon from '@material-ui/icons/Refresh';
import ListenerIcon from '@material-ui/icons/WifiTethering';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';

import { LISTENERS_FETCH } from "../../events";
import Button from "../../components/Button";
import ModuleHeader from "../../components/ModuleHeader";
import AutoRefreshModeButton from "../../components/AutoRefreshModeButton";
import styles from './Listeners.scss';

const Listeners = () => {
    const emit = useEmit();
    const [listenersList = []] = useEventrixState('listeners');
    const [currentState, setCurrentState] = useState();
    const fetchListeners = useCallback(() => { emit(LISTENERS_FETCH) }, [emit]);
    useEffect(() => { fetchListeners() }, [fetchListeners]);
    return (
        <div className={styles.moduleContainer}>
            <ModuleHeader icon={<HistoryIcon fontSize="medium"/>} title="State history">
                <AutoRefreshModeButton type="receivers" />
                <Button onClick={fetchListeners} kind="secondary">
                    <RefreshIcon fontSize="small" /> Reload receivers
                </Button>
            </ModuleHeader>
            <div className={styles.moduleContent}>
                <div className={styles.list}>
                    {listenersList.map((item, index)=> (
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
                                <Tooltip title="Listeners">
                                    <Chip
                                        icon={<ListenerIcon />}
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
                                icon={<ListenerIcon />}
                                label={`Listeners: ${currentState.count || 0}`}
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

export default Listeners;
