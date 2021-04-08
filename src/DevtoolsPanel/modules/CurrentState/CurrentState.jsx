import React, {useCallback, useEffect} from 'react';
import { useEmit, useEventrixState } from 'eventrix/react';
import RefreshIcon from '@material-ui/icons/Refresh';
import StorageIcon from '@material-ui/icons/Storage';
import ObjectInspector from "react-object-inspector";
import { STATE_FETCH } from "../../events";
import ModuleHeader from "../../components/ModuleHeader";
import Button from '../../components/Button';
import AutoRefreshModeButton from "../../components/AutoRefreshModeButton";
import styles from './CurrentState.scss';

const CurrentState = () => {
    const emit = useEmit();
    const [currentState = []] = useEventrixState('currentState');
    const fetchState = useCallback(() => { emit(STATE_FETCH) }, [emit]);
    useEffect(() => { fetchState() }, [fetchState]);
    return (
        <div className={styles.moduleContainer}>
            <ModuleHeader icon={<StorageIcon fontSize="medium"/>} title="Current state">
                <AutoRefreshModeButton type="currentState" />
                <Button onClick={fetchState} kind="secondary">
                    <RefreshIcon fontSize="small" /> Reload state
                </Button>
            </ModuleHeader>
            <div className={styles.moduleContent}>
                <ObjectInspector data={currentState} />
            </div>
        </div>
    )
};

export default CurrentState;
