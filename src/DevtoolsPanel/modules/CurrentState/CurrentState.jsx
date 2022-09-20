import React, { useMemo, useEffect, useCallback } from 'react';
import { useEmit, useEventrixState } from 'eventrix';
import RefreshIcon from '@material-ui/icons/Refresh';
import StorageIcon from '@material-ui/icons/Storage';
import ObjectInspector from "react-object-inspector";
import {STATE_FETCH, STATE_LISTENERS_FETCH} from "../../events";
import ModuleHeader from "../../components/ModuleHeader";
import Button from '../../components/Button';
import AutoRefreshModeButton from "../../components/AutoRefreshModeButton";
import styles from './CurrentState.scss';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Chip from "@material-ui/core/Chip";
import ListenerIcon from '@material-ui/icons/WifiTethering';
import ReceiverIcon from '@material-ui/icons/SettingsInputAntenna';
import Divider from "@material-ui/core/Divider";
import { sortState } from '../../helpers/sortState';

const CurrentState = () => {
    const emit = useEmit();
    const [currentState = []] = useEventrixState('currentState');
    const [listenersList = []] = useEventrixState('stateListeners');
    const fetchState = useCallback(() => { emit(STATE_FETCH) }, [emit]);
    const fetchStateListeners = useCallback(() => { emit(STATE_LISTENERS_FETCH) }, [emit]);
    const fetchAll = useCallback(() => {
        fetchState();
        fetchStateListeners();
    }, [fetchState, fetchStateListeners]);
    const alphabeticallySortedCurrentState = useMemo(() => sortState(currentState), [currentState])

    useEffect(() => {
        fetchAll()
    }, [fetchAll]);

    return (
        <div className={styles.moduleContainer}>
            <ModuleHeader icon={<StorageIcon fontSize="medium"/>} title="Current state">
                <AutoRefreshModeButton type="currentState" />
                <Button onClick={fetchAll} kind="secondary">
                    <RefreshIcon fontSize="small" /> Reload state
                </Button>
            </ModuleHeader>
            <div className={styles.moduleContent}>
                <div className={styles.statePreview}>
                    <ObjectInspector data={alphabeticallySortedCurrentState} />
                </div>
                <div className={styles.stateListenersList}>
                    <h4>States that are listening</h4>
                    <Divider />
                    <div className={styles.list}>
                        {listenersList.map((item)=> (
                            <div
                                key={item.stateName}
                                className={styles.listItem}
                            >
                                <div className={styles.name}>{item.stateName}</div>
                                <div className={styles.counters}>
                                    <Tooltip title="Receivers">
                                        <Chip
                                            icon={<ReceiverIcon />}
                                            size="small"
                                            label={item.receivers || 0}
                                            variant="outlined"
                                        />
                                    </Tooltip>
                                    <Tooltip title="Listeners">
                                        <Chip
                                            icon={<ListenerIcon />}
                                            size="small"
                                            label={item.listeners || 0}
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

export default CurrentState;
