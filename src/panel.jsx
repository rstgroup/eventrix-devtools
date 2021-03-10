import React from 'react';
import ReactDOM from 'react-dom';
import { Eventrix } from 'eventrix';
import { EventrixProvider } from 'eventrix/react';
import App from './DevtoolsPanel/App';
import DebuggerService from './DevtoolsPanel/services/debugger';

const eventrixInstance = new Eventrix({});
const debuggerService = new DebuggerService({ eventrix: eventrixInstance });


ReactDOM.render(
    <EventrixProvider eventrix={eventrixInstance}>
        <App />
    </EventrixProvider>,
    document.getElementById('root')
);