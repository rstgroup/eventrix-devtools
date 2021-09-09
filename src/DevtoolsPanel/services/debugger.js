import { useEventrix, fetchToState, receiver } from 'eventrix';
import {
    EVENTS_HISTORY_FETCH,
    LISTENERS_FETCH,
    RECEIVERS_FETCH,
    STATE_FETCH,
    STATE_HISTORY_FETCH, STATE_LISTENERS_FETCH,
    TURN_OFF_AUTO_REFRESH_MODE,
    TURN_ON_AUTO_REFRESH_MODE
} from '../events';
import { WINDOW_EVENTRIX_DEBUGGER_NAME } from '../constants';
// import receiversCounts from "../../mockedData/receiversCount";
// import listenersCount from "../../mockedData/listenersCount";

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
                    this.eventrix.emit(STATE_LISTENERS_FETCH);
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
            if (refreshType === 'receivers') {
                this.autoRefreshHandler[refreshType] = setInterval(() => {
                    this.eventrix.emit(RECEIVERS_FETCH);
                }, 1000);
            }
            if (refreshType === 'listeners') {
                this.autoRefreshHandler[refreshType] = setInterval(() => {
                    this.eventrix.emit(LISTENERS_FETCH);
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
        return new Promise((resolve) => {
            chrome.devtools.inspectedWindow.eval(
                `${WINDOW_EVENTRIX_DEBUGGER_NAME}.eventsHistory`,
                (result = [], isException) => {
                    resolve(result);
                }
            );
        })
    }

    @fetchToState(STATE_HISTORY_FETCH, 'stateHistory')
    getStateHistory() {
        return new Promise((resolve) => {
            chrome.devtools.inspectedWindow.eval(
                `${WINDOW_EVENTRIX_DEBUGGER_NAME}.stateHistory`,
                (result = [], isException) => {
                    resolve(result);
                }
            );
        })
    }

    @fetchToState(STATE_FETCH, 'currentState')
    getCurrentState() {
        return new Promise((resolve) => {
            chrome.devtools.inspectedWindow.eval(
                `${WINDOW_EVENTRIX_DEBUGGER_NAME}.getState()`,
                (result = {}, isException) => {
                    resolve(result);
                }
            );
        })
    }

    @fetchToState(RECEIVERS_FETCH, 'receivers')
    getReceivers() {
        return new Promise((resolve) => {
            chrome.devtools.inspectedWindow.eval(
                `${WINDOW_EVENTRIX_DEBUGGER_NAME}.getAllEventsReceiversCount()`,
                (result = [], isException) => {
                    resolve(result || []);
                }
            );
        })
    }

    @fetchToState(LISTENERS_FETCH, 'listeners')
    getListeners() {
        return new Promise((resolve) => {
            chrome.devtools.inspectedWindow.eval(
                `${WINDOW_EVENTRIX_DEBUGGER_NAME}.getAllEventsListenersCount()`,
                (result = [], isException) => {
                    resolve(result || []);
                }
            );
        })
    }

    @fetchToState(STATE_LISTENERS_FETCH, 'stateListeners')
    getStateListeners() {
        return Promise.all([
            this.getReceivers(),
            this.getListeners(),
        ]).then(([receivers, listeners]) => {
            const setStateEventsList = {};
            receivers.forEach(receiver => {
                if (receiver.eventName.indexOf('setState:') === 0) {
                    const stateName = receiver.eventName.replace('setState:', '');
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
