import React from 'react';
import styles from './App.scss';
import CurrentState from "./modules/CurrentState";
import StateHistory from "./modules/StateHistory";
import EventsHistory from "./modules/EventsHistory";
import Route from "./components/Route";
import RouteLink from "./components/RouteLink/RouteLink";
import { ROUTES } from "./constants/routes";
import StorageIcon from '@material-ui/icons/Storage';
import DateRangeIcon from '@material-ui/icons/DateRange';
import HistoryIcon from '@material-ui/icons/History';

const App = () => {
    return (
        <div className={styles.container}>
            <div className={styles.navigation}>
                <div className={styles.title}>
                    <h1>Eventrix</h1>
                    <div>devtools</div>
                </div>
                <RouteLink to={ROUTES.CURRENT_STATE} activeClassName={styles.activeMenuItem} className={styles.menuItem}><StorageIcon fontSize="small" /> CURRENT STATE</RouteLink>
                <RouteLink to={ROUTES.STATE_HISTORY} activeClassName={styles.activeMenuItem} className={styles.menuItem}><HistoryIcon fontSize="small" /> STATE HISTORY</RouteLink>
                <RouteLink to={ROUTES.EVENTS_HISTORY} activeClassName={styles.activeMenuItem} className={styles.menuItem}><DateRangeIcon fontSize="small" /> EVENTS HISTORY</RouteLink>
            </div>
            <div className={styles.content}>
                <Route name={ROUTES.CURRENT_STATE}>
                    <CurrentState />
                </Route>
                <Route name={ROUTES.STATE_HISTORY}>
                    <StateHistory />
                </Route>
                <Route name={ROUTES.EVENTS_HISTORY}>
                    <EventsHistory />
                </Route>
            </div>
        </div>
    )
};

export default App;
