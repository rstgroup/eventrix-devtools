import React from 'react';
import StorageIcon from '@material-ui/icons/Storage';
import DateRangeIcon from '@material-ui/icons/DateRange';
import HistoryIcon from '@material-ui/icons/History';
import ReceiverIcon from '@material-ui/icons/SettingsInputAntenna';
import ListenerIcon from '@material-ui/icons/WifiTethering';

import CurrentState from "./modules/CurrentState";
import StateHistory from "./modules/StateHistory";
import EventsHistory from "./modules/EventsHistory";
import Receivers from "./modules/Receivers";
import Listeners from "./modules/Listeners";

import Route from "./components/Route";
import RouteLink from "./components/RouteLink/RouteLink";
import { ROUTES } from "./constants/routes";

import styles from './App.scss';

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
                <RouteLink to={ROUTES.RECEIVERS} activeClassName={styles.activeMenuItem} className={styles.menuItem}><ReceiverIcon fontSize="small" /> RECEIVERS</RouteLink>
                <RouteLink to={ROUTES.LISTENERS} activeClassName={styles.activeMenuItem} className={styles.menuItem}><ListenerIcon fontSize="small" /> LISTENERS</RouteLink>
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
                <Route name={ROUTES.RECEIVERS}>
                    <Receivers />
                </Route>
                <Route name={ROUTES.LISTENERS}>
                    <Listeners />
                </Route>
            </div>
        </div>
    )
};

export default App;
