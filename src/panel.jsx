import React from 'react';
import ReactDOM from 'react-dom';
import { Eventrix } from 'eventrix';
import { EventrixProvider } from 'eventrix/react';
import App from './DevtoolsPanel/App';
import DebuggerService from './DevtoolsPanel/services/debugger';
// import DebuggerService from './mockedData/services/debugger';
import { ROUTES } from "./DevtoolsPanel/constants/routes";

const eventrixInstance = new Eventrix({
    currentRoute: ROUTES.CURRENT_STATE,
});
const debuggerService = new DebuggerService({ eventrix: eventrixInstance });
// const debuggerService = new DebuggerService({ eventrix: eventrixInstance });

ReactDOM.render(
    <EventrixProvider eventrix={eventrixInstance}>
        <App />
    </EventrixProvider>,
    document.getElementById('root')
);