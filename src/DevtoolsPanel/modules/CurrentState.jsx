import React, {useCallback, useEffect} from 'react';
import { useEmit, useEventrixState } from 'eventrix/react';
import styles from './CurrentState.scss';
import {STATE_FETCH} from "../events";
import ObjectInspector from "react-object-inspector";

const CurrentState = () => {
    const emit = useEmit();
    const [currentState = []] = useEventrixState('currentState');
    const fetchState = useCallback(() => { emit(STATE_FETCH) }, [emit]);
    useEffect(() => { fetchState() }, [fetchState]);
    return (
        <div className={styles.moduleContainer}>
            <div className={styles.moduleHeader}>
                <h2>Current state</h2>
                <div className={styles.actionButtons}>
                    <button onClick={fetchState}>Reload state</button>
                </div>
            </div>
            <div className={styles.moduleContent}>
                <ObjectInspector data={currentState} />
            </div>
        </div>
    )
};

export default CurrentState;
