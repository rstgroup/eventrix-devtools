import React, {useCallback, useEffect} from 'react';
import { useEmit, useEventrixState } from 'eventrix/react';
import styles from './CurrentState.scss';
import { STATE_FETCH } from "../../events";
import ObjectInspector from "react-object-inspector";
import Button from '../../components/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import StorageIcon from '@material-ui/icons/Storage';

const CurrentState = () => {
    const emit = useEmit();
    const [currentState = []] = useEventrixState('currentState');
    const fetchState = useCallback(() => { emit(STATE_FETCH) }, [emit]);
    useEffect(() => { fetchState() }, [fetchState]);
    return (
        <div className={styles.moduleContainer}>
            <div className={styles.moduleHeader}>
                <h2><StorageIcon fontSize="medium"/> Current state</h2>
                <div className={styles.actionButtons}>
                    <Button onClick={fetchState} kind="secondary">
                        <RefreshIcon fontSize="small" /> Reload state
                    </Button>
                </div>
            </div>
            <div className={styles.moduleContent}>
                <ObjectInspector data={currentState} />
            </div>
        </div>
    )
};

export default CurrentState;
