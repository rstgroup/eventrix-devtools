import React, {useCallback} from 'react';

import CurrentState from "./modules/CurrentState";
import StateHistory from "./modules/StateHistory";

import Route from "./components/Route";
import { ROUTES } from "./constants/routes";
import {Stack} from "@mui/material";
import Menu from "./modules/Menu";
import Divider from "@mui/material/Divider";
import StateListenersStats from "./modules/StateListenersStats";
import StatsBox from "./components/StatsBox";
import './App.css';
import {DateRangeIcon, EmitIcon, HistoryIcon, StorageIcon} from "./components/icons";
import Header from "./components/Header";
import {useEmit} from "eventrix";
import {
    EVENTS_HISTORY_FETCH,
    RESET_EMITTER,
    STATE_FETCH,
    STATE_HISTORY_FETCH,
    STATE_HISTORY_RESET,
    EVENTS_HISTORY_RESET
} from "./events";
import StateHistoryPreview from "./modules/StateHistory/StateHistoryPreview";
import StateStats from "./modules/StateHistory/StateStats";
import EventsHistory from "./modules/EventsHistory";
import EventsStats from "./modules/EventsHistory/EventsStats";
import EventsHistoryPreview from "./modules/EventsHistory/EventsHistoryPreview";
import Emitter from "./modules/Emitter";

const App = () => {
    const emit = useEmit();
    const fetchState = useCallback(() => { emit(STATE_FETCH) }, [emit]);
    const fetchStateHistory = useCallback(() => { emit(STATE_HISTORY_FETCH) }, [emit]);
    const fetchEventsHistory = useCallback(() => { emit(EVENTS_HISTORY_FETCH) }, [emit]);

    const resetStateHistory = useCallback(() => { emit(STATE_HISTORY_RESET) }, [emit]);
    const resetEventsHistory = useCallback(() => { emit(EVENTS_HISTORY_RESET) }, [emit]);
    const resetEmitter = useCallback(() => { emit(RESET_EMITTER) }, [emit]);

    return (
        <Stack direction="row">
            <Menu />
            <Divider orientation="vertical" flexItem />
            <Stack sx={{ width: '100%', height: '100%' }}>
                <Route name={ROUTES.CURRENT_STATE}>
                    <Header
                        title="Current state"
                        icon={<StorageIcon width="26px" />}
                        refreshAction={fetchState}
                    />
                    <Divider />
                    <Stack direction="row" padding={2} spacing={1}>
                        <CurrentState />
                        <StatsBox title="States use stats">
                            <StateListenersStats />
                        </StatsBox>
                    </Stack>
                </Route>
                <Route name={ROUTES.STATE_HISTORY}>
                    <Header
                        title="State history"
                        icon={<DateRangeIcon width="26px" />}
                        resetAction={resetStateHistory}
                        refreshAction={fetchStateHistory}
                    />
                    <Divider />
                    <Stack direction="row" padding={2} spacing={1}>
                        <StateHistory fetchStateHistory={fetchStateHistory} />
                        <Stack>
                            <StatsBox title="State update stats">
                                <StateStats />
                            </StatsBox>
                            <StateHistoryPreview />
                        </Stack>
                    </Stack>
                </Route>
                <Route name={ROUTES.EVENTS_HISTORY}>
                    <Header
                        title="Events history"
                        icon={<HistoryIcon width="26px" />}
                        resetAction={resetEventsHistory}
                        refreshAction={fetchEventsHistory}
                    />
                    <Divider />
                    <Stack direction="row" padding={2} spacing={1}>
                        <EventsHistory fetchEventsHistory={fetchEventsHistory} />
                        <Stack>
                            <StatsBox title="State update stats">
                                <EventsStats />
                            </StatsBox>
                            <EventsHistoryPreview />
                        </Stack>
                    </Stack>
                </Route>
                <Route name={ROUTES.EMITTER}>
                    <Header
                        title="Emitter"
                        icon={<EmitIcon width="26px" />}
                        resetAction={resetEmitter}
                    />
                    <Divider />
                    <Stack direction="row" padding={2} spacing={1}>
                        <Emitter fetchEventsHistory={fetchEventsHistory} />
                    </Stack>
                </Route>
            </Stack>
        </Stack>
    )
};

export default App;
