import { EventsReceiver, fetchToStateReceiver} from 'eventrix';
import {
    EMITTER_EMIT,
    EVENTS_HISTORY_FETCH, EVENTS_HISTORY_RESET,
    LISTENERS_FETCH,
    RECEIVERS_FETCH,
    STATE_FETCH,
    STATE_HISTORY_FETCH, STATE_HISTORY_RESET,
    STATE_LISTENERS_FETCH,
    TURN_OFF_AUTO_REFRESH_MODE,
    TURN_ON_AUTO_REFRESH_MODE
} from '../../DevtoolsPanel/events';
import eventsHistory from '../eventsHistory';
import stateHistory from '../stateHistory';
import currentState from '../currentState';
import receiversCounts from '../receiversCount';
import listenersCount from '../listenersCount';
import {WINDOW_EVENTRIX_DEBUGGER_NAME} from "../../DevtoolsPanel/constants";

class DebuggerService {
    constructor({ eventrix }) {
        this.eventrix = eventrix;
        this.receivers = [
            new EventsReceiver(TURN_ON_AUTO_REFRESH_MODE, this.turnOnAutoRefreshMode),
            new EventsReceiver(TURN_OFF_AUTO_REFRESH_MODE, this.turnOffAutoRefreshMode),
            new EventsReceiver(EMITTER_EMIT, this.emitEvent),
            fetchToStateReceiver(EVENTS_HISTORY_FETCH, 'eventsHistory', this.getEventsHistory),
            fetchToStateReceiver(EVENTS_HISTORY_RESET, 'eventsHistory', this.resetEventsHistory),
            fetchToStateReceiver(STATE_HISTORY_FETCH, 'stateHistory', this.getStateHistory),
            fetchToStateReceiver(STATE_HISTORY_RESET, 'stateHistory', this.resetStateHistory),
            fetchToStateReceiver(STATE_FETCH, 'currentState', this.getCurrentState),
            fetchToStateReceiver(RECEIVERS_FETCH, 'receivers', this.getReceivers),
            fetchToStateReceiver(LISTENERS_FETCH, 'listeners', this.getListeners),
            fetchToStateReceiver(STATE_LISTENERS_FETCH, 'stateListeners', this.getStateListeners),
        ];
        this.receivers.forEach(receiver => {
            this.eventrix.useReceiver(receiver);
        });
        this.autoRefreshHandler = {
            currentState: null,
            stateHistory: null,
            eventsHistory: null,
        };
    }

    turnOnAutoRefreshMode = (eventName, eventData, stateManager) => {
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

    turnOffAutoRefreshMode = (eventName, eventData, stateManager) => {
        const { refreshType } = eventData;
        if (this.autoRefreshHandler[refreshType]) {
            clearInterval(this.autoRefreshHandler[refreshType]);
            this.autoRefreshHandler[refreshType] = null;
        }
        stateManager.setState(`autoRefreshMode.${refreshType}`, false);
    }

    getEventsHistory = () => {
        return Promise.resolve(eventsHistory.reverse());
    }

    getStateHistory = () => {
        return Promise.resolve(stateHistory.reverse());
    }

    getCurrentState = () => {
        return Promise.resolve(currentState);
    }

    getReceivers = () => {
        return Promise.resolve(receiversCounts);
    }

    getListeners = () => {
        return Promise.resolve(listenersCount);
    }

    emitEvent = () => {
        new Promise.resolve(true);
    }

    resetStateHistory = () => {
        return Promise.resolve([])
    }

    resetEventsHistory = () => {
        return Promise.resolve([])
    }

    getStateListeners = () => {
        return Promise.all([
            this.getReceivers(),
            this.getListeners(),
        ]).then(([receivers, listeners]) => {
            const setStateEventsList = {};
            receivers.forEach(receiver => {
                if (receiver.eventName.indexOf('setState:') === 0) {
                    const stateName = listener.eventName.replace('setState:', '');
                    setStateEventsList[stateName] = {
                        receivers: receiver.count,
                    }
                }
            });
            listeners.forEach(listener => {
                if (listener.eventName.indexOf('setState:') === 0) {
                    const stateName = listener.eventName.replace('setState:', '');
                    if (!setStateEventsList[stateName]) {
                        setStateEventsList[stateName] = {};
                    }
                    setStateEventsList[stateName].listeners = listener.count;
                }
            });
            return Object.keys(setStateEventsList).map(stateName => ({
                stateName,
                receivers: setStateEventsList[stateName].receivers,
                listeners: setStateEventsList[stateName].listeners,
            }));
        });
    }
}

export default DebuggerService;
