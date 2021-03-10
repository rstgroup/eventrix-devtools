import { useEventrix, fetchToState } from "eventrix/decorators";
import {EVENTS_HISTORY_FETCH, STATE_FETCH, STATE_HISTORY_FETCH} from "../events";
import { WINDOW_EVENTRIX_DEBUGGER_NAME } from "../constants";

@useEventrix
class DebuggerService {

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
}

export default DebuggerService;
