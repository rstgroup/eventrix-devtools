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
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

import {STATE_HISTORY_FETCH} from "../../events";
import Button from "../../components/Button";
import ModuleHeader from "../../components/ModuleHeader";
import AutoRefreshModeButton from "../../components/AutoRefreshModeButton";
import styles from './StateHistory.scss';
import { getStateUpdateStats } from "./helpers";

const StateHistory = () => {
    const emit = useEmit();
    const [stateHistory = []] = useEventrixState('stateHistory');
    const [currentState, setCurrentState] = useState();
    const fetchHistory = useCallback(() => { emit(STATE_HISTORY_FETCH) }, [emit]);
    useEffect(() => { fetchHistory() }, [fetchHistory]);
    return (
        <div className={styles.moduleContainer}>
            <ModuleHeader icon={<HistoryIcon fontSize="medium"/>} title="State history">
                <AutoRefreshModeButton type="stateHistory" />
                <Button onClick={fetchHistory} kind="secondary">
                    <RefreshIcon fontSize="small" /> Reload history
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
            </div>
        </div>
    )
};

export default StateHistory;
