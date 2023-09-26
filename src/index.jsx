import React from 'react';
import ReactDOM from 'react-dom/client';
import { Eventrix, EventrixProvider } from 'eventrix';
import App from './DevtoolsPanel/App';
import DebuggerService from './DevtoolsPanel/services/debugger';
import DevDebuggerService from './mockedData/services/debugger';
import { ROUTES } from "./DevtoolsPanel/constants/routes";

const eventrixInstance = new Eventrix({
    currentRoute: ROUTES.CURRENT_STATE,
    eventsHistory: [],
    eventsHistoryPreview: null,
    eventsHistoryFilters: {
        search: '',
        filters: {
            withoutSetStateEvents: true,
        }
    },
    stateHistory: [],
    stateHistoryPreview: null,
    stateHistoryFilters: { search: '' },
});

if(import.meta.env.MODE === 'development') {
    new DevDebuggerService({ eventrix: eventrixInstance })
} else {
    new DebuggerService({eventrix: eventrixInstance});
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <EventrixProvider eventrix={eventrixInstance}>
        <App />
    </EventrixProvider>
);
