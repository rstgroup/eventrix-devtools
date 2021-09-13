import React, {useCallback, useEffect} from 'react';
import { useEmit } from 'eventrix';
import HistoryIcon from '@material-ui/icons/History';
import RefreshIcon from '@material-ui/icons/Refresh';

import {STATE_HISTORY_FETCH} from "../../events";
import Button from "../../components/Button";
import ModuleHeader from "../../components/ModuleHeader";
import AutoRefreshModeButton from "../../components/AutoRefreshModeButton";
import styles from './StateHistory.scss';
import SearchBox from "../../components/SearchBox";
import StateStats from "./StateStats";
import StateHistoryPreview from "./StateHistoryPreview";
import StateHistoryList from "./StateHistoryList";

const StateHistory = () => {
    const emit = useEmit();
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
                    <SearchBox label="State path" filtersStateName="stateHistoryFilters" />
                    <StateHistoryList />
                </div>
                <StateHistoryPreview />
                <StateStats />
            </div>
        </div>
    )
};

export default StateHistory;
