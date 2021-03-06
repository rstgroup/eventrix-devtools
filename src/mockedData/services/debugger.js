import { useEventrix, fetchToState, receiver } from 'eventrix';
import {
    EVENTS_HISTORY_FETCH,
    LISTENERS_FETCH,
    RECEIVERS_FETCH,
    STATE_FETCH,
    STATE_HISTORY_FETCH,
    STATE_LISTENERS_FETCH,
    TURN_OFF_AUTO_REFRESH_MODE,
    TURN_ON_AUTO_REFRESH_MODE
} from '../../DevtoolsPanel/events';
import eventsHistory from '../eventsHistory';
import stateHistory from '../stateHistory';
import currentState from '../currentState';
import receiversCounts from '../receiversCount';
import listenersCount from '../listenersCount';

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
        return Promise.resolve(eventsHistory.reverse());
    }

    @fetchToState(STATE_HISTORY_FETCH, 'stateHistory')
    getStateHistory() {
        return Promise.resolve(stateHistory.reverse());
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

    @fetchToState(STATE_LISTENERS_FETCH, 'stateListeners')
    getStateListeners() {
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
