import React, {useCallback, useEffect, useState} from 'react';
import { useEmit, useEventrixState } from 'eventrix/react';
import styles from './StateHistory.scss';
import {STATE_HISTORY_FETCH} from "../events";
import ObjectInspector from "react-object-inspector";

const StateHistory = () => {
    const emit = useEmit();
    const [stateHistory = []] = useEventrixState('stateHistory');
    const [currentState, setCurrentState] = useState();
    const fetchHistory = useCallback(() => { emit(STATE_HISTORY_FETCH) }, [emit]);
    const getClassName = useCallback((quantity) => quantity > 0 ? styles.greenCircle : styles.redCircle, []);
    useEffect(() => { fetchHistory() }, [fetchHistory]);
    return (
        <div className={styles.moduleContainer}>
            <div className={styles.moduleHeader}>
                <h2>State history</h2>
                <div className={styles.actionButtons}>
                    <button onClick={fetchHistory}>Reload history</button>
                </div>
            </div>
            <div className={styles.moduleContent}>
                <div className={styles.list}>
                    {stateHistory.map((item, index)=> (
                        <div key={index} onClick={() => setCurrentState(item)} className={styles.listItem}>
                            <div className={styles.name}>{item.path}</div>
                            <div className={getClassName(item.receiversCount)}>{item.receiversCount}</div>
                            <div className={getClassName(item.listenersCount)}>{item.listenersCount}</div>
                        </div>
                    ))}
                </div>
                <div className={styles.preview}>
                    {currentState &&
                    <div>
                        <h3>{currentState.path}</h3>
                        <div className={styles.counters}>
                            <div>Receivers: {currentState.receiversCount}</div>
                            <div>Listeners: {currentState.listenersCount}</div>
                        </div>
                        <ObjectInspector data={currentState.state} />
                    </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default StateHistory;
