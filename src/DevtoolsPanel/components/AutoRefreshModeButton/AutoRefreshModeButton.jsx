import React, {useCallback} from 'react';
import { useEventrixState, useEmit } from 'eventrix';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Button from '../Button';
import {TURN_OFF_AUTO_REFRESH_MODE, TURN_ON_AUTO_REFRESH_MODE} from '../../events';
import styles from './AutoRefreshModeButton.scss';

const AutoRefreshModeButton = ({ type }) => {
    const [isAutoRefreshModeActive] = useEventrixState(`autoRefreshMode.${type}`);
    const emit = useEmit();
    const toggleAutoRefreshMode = useCallback(() => {
        if (isAutoRefreshModeActive) {
            emit(TURN_OFF_AUTO_REFRESH_MODE, { refreshType: type });
        } else {
            emit(TURN_ON_AUTO_REFRESH_MODE, { refreshType: type });
        }
    }, [isAutoRefreshModeActive, emit, type]);
    return (
        <Button onClick={toggleAutoRefreshMode}>
            <span className={isAutoRefreshModeActive ? styles.active : styles.disabled}><FiberManualRecordIcon fontSize="small"/></span> Auto refresh mode
        </Button>
    )
};

export default AutoRefreshModeButton;
