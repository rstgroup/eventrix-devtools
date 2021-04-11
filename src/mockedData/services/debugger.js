import { useEventrix, fetchToState, receiver } from "eventrix/decorators";
import {
    EVENTS_HISTORY_FETCH, LISTENERS_FETCH, RECEIVERS_FETCH,
    STATE_FETCH,
    STATE_HISTORY_FETCH,
    TURN_OFF_AUTO_REFRESH_MODE,
    TURN_ON_AUTO_REFRESH_MODE
} from "../../DevtoolsPanel/events";
import eventsHistory from "../eventsHistory";
import stateHistory from "../stateHistory";
import currentState from "../currentState";
import receiversCounts from "../receiversCount";
import listenersCount from "../listenersCount";

@useEventrix
class DebuggerService {
    constructor() {
        this.autoRefreshHandler = {
            currentState: null,
            stateHistory: null,
            eventsHistory: null,
        };
    }

    @receiver(TURN_ON_AUTO_REFRESH_MODE)
    turnOnAutoRefreshMode(eventName, eventData, stateManager) {
        const { refreshType } = eventData;
        if (!this.autoRefreshHandler[refreshType]) {
            if (refreshType === 'currentState') {
                this.autoRefreshHandler[refreshType] = setInterval(() => {
                    this.eventrix.emit(STATE_FETCH);
                }, 1000);
            }
            if (refreshType === 'stateHistory') {
                this.autoRefreshHandler[refreshType] = setInterval(() => {
                    this.eventrix.emit(STATE_HISTORY_FETCH);
                }, 1000);
            }
            if (refreshType === 'eventsHistory') {
                this.autoRefreshHandler[refreshType] = setInterval(() => {
                    this.eventrix.emit(EVENTS_HISTORY_FETCH);
                }, 1000);
            }
        }
        stateManager.setState(`autoRefreshMode.${refreshType}`, true);
    }

    @receiver(TURN_OFF_AUTO_REFRESH_MODE)
    turnOffAutoRefreshMode(eventName, eventData, stateManager) {
        const { refreshType } = eventData;
        if (this.autoRefreshHandler[refreshType]) {
            clearInterval(this.autoRefreshHandler[refreshType]);
            this.autoRefreshHandler[refreshType] = null;
        }
        stateManager.setState(`autoRefreshMode.${refreshType}`, false);
    }

    @fetchToState(EVENTS_HISTORY_FETCH, 'eventsHistory')
    getEventsHistory() {
        return Promise.resolve(eventsHistory);
    }

    @fetchToState(STATE_HISTORY_FETCH, 'stateHistory')
    getStateHistory() {
        return Promise.resolve(stateHistory);
    }

    @fetchToState(STATE_FETCH, 'currentState')
    getCurrentState() {
        return Promise.resolve(currentState);
    }

    @fetchToState(RECEIVERS_FETCH, 'receivers')
    getReceivers() {
        return Promise.resolve(receiversCounts);
    }

    @fetchToState(LISTENERS_FETCH, 'listeners')
    getListeners() {
        return Promise.resolve(listenersCount);
    }
}

export default DebuggerService;
