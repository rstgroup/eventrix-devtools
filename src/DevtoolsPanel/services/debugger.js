import {EventsReceiver, fetchToStateReceiver} from 'eventrix';
import {
    EMITTER_EMIT,
    EVENTS_HISTORY_FETCH, EVENTS_HISTORY_RESET,
    LISTENERS_FETCH,
    RECEIVERS_FETCH,
    STATE_FETCH,
    STATE_HISTORY_FETCH, STATE_HISTORY_RESET, STATE_LISTENERS_FETCH,
    TURN_OFF_AUTO_REFRESH_MODE,
    TURN_ON_AUTO_REFRESH_MODE
} from '../events';
import {WINDOW_EVENTRIX_DEBUGGER_NAME} from '../constants';

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
        const {refreshType} = eventData;
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

    turnOffAutoRefreshMode(eventName, eventData, stateManager) {
        const {refreshType} = eventData;
        if (this.autoRefreshHandler[refreshType]) {
            clearInterval(this.autoRefreshHandler[refreshType]);
            this.autoRefreshHandler[refreshType] = null;
        }
        stateManager.setState(`autoRefreshMode.${refreshType}`, false);
    }

    getEventsHistory = () => {
        return new Promise((resolve) => {
            chrome.devtools.inspectedWindow.eval(
                `${WINDOW_EVENTRIX_DEBUGGER_NAME}.eventsHistory`,
                (result = [], isException) => {
                    resolve(result.reverse());
                }
            );
        })
    }

    getStateHistory = () => {
        return new Promise((resolve) => {
            chrome.devtools.inspectedWindow.eval(
                `${WINDOW_EVENTRIX_DEBUGGER_NAME}.stateHistory`,
                (result = [], isException) => {
                    resolve(result.reverse());
                }
            );
        })
    }

    getCurrentState = () => {
        return new Promise((resolve) => {
            chrome.devtools.inspectedWindow.eval(
                `${WINDOW_EVENTRIX_DEBUGGER_NAME}.getState()`,
                (result = {}, isException) => {
                    resolve(result);
                }
            );
        })
    }

    getReceivers = () => {
        return new Promise((resolve) => {
            chrome.devtools.inspectedWindow.eval(
                `${WINDOW_EVENTRIX_DEBUGGER_NAME}.getAllEventsReceiversCount()`,
                (result = [], isException) => {
                    resolve(result || []);
                }
            );
        })
    }

    getListeners = () => {
        return new Promise((resolve) => {
            chrome.devtools.inspectedWindow.eval(
                `${WINDOW_EVENTRIX_DEBUGGER_NAME}.getAllEventsListenersCount()`,
                (result = [], isException) => {
                    resolve(result || []);
                }
            );
        })
    }

    isJSON = (str) => {
        if (!str || str.length === 0) return false;
        const firstChar = str[0];
        const lastChar = str[str.length - 1];
        const isObject = firstChar === '{' && lastChar === '}';
        const isArray = firstChar === '[' && lastChar === ']';
        return isObject || isArray;
    }

    emitEvent = (name, { eventName, eventPayload }) => {
        const parsedEventPayload = this.isJSON(eventPayload) ? JSON.parse(eventPayload) : eventPayload;
        return new Promise((resolve) => {
            chrome.devtools.inspectedWindow.eval(
                `${WINDOW_EVENTRIX_DEBUGGER_NAME}.eventrix.emit('${eventName}', ${eventPayload})`,
                (result = [], isException) => {
                    if(isException) {
                        console.log('error', isException);
                    } else {
                        resolve(result || []);
                    }
                }
            );
        })
    }

    resetStateHistory = () => {
        return new Promise((resolve) => {
            chrome.devtools.inspectedWindow.eval(
                `${WINDOW_EVENTRIX_DEBUGGER_NAME}.stateHistory = []`,
                (result = [], isException) => {
                    resolve([]);
                }
            );
        })
    }

    resetEventsHistory = () => {
        return new Promise((resolve) => {
            chrome.devtools.inspectedWindow.eval(
                `${WINDOW_EVENTRIX_DEBUGGER_NAME}.eventsHistory = []`,
                (result = [], isException) => {
                    resolve([]);
                }
            );
        })
    }

    getStateListeners = () => {
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
