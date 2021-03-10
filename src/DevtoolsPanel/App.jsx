import React, { useState } from 'react';
import styles from './App.scss';
import CurrentState from "./modules/CurrentState";
import StateHistory from "./modules/StateHistory";
import EventsHistory from "./modules/EventsHistory";

const PAGES = {
    CURRENT_STATE: 'currentState',
    STATE_HISTORY: 'stateHistory',
    EVENTS_HISTORY: 'eventsHistory',
};

const App = () => {
    const [ page, setPage ] = useState(PAGES.CURRENT_STATE);
    return (
        <div className={styles.container}>
            <div className={styles.navigation}>
                <div onClick={() => setPage(PAGES.CURRENT_STATE)} className={styles.menuItem}>CURRENT STATE {page === PAGES.CURRENT_STATE ? '>' : null}</div>
                <div onClick={() => setPage(PAGES.STATE_HISTORY)} className={styles.menuItem}>STATE HISTORY {page === PAGES.STATE_HISTORY ? '>' : null}</div>
                <div onClick={() => setPage(PAGES.EVENTS_HISTORY)} className={styles.menuItem}>EVENTS HISTORY {page === PAGES.EVENTS_HISTORY ? '>' : null}</div>
            </div>
            <div className={styles.content}>
                {page === PAGES.CURRENT_STATE ? <CurrentState /> : null}
                {page === PAGES.STATE_HISTORY ? <StateHistory /> : null}
                {page === PAGES.EVENTS_HISTORY ? <EventsHistory /> : null}
            </div>
        </div>
    )
};

export default App;
