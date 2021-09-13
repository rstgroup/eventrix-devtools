const EVENTRIX_DEBUGGER_SIGNATURE = 'eventrixDebuggerDevtools';

const sendEventrixDebuggerMessage = (message) => {
    chrome.runtime.sendMessage({ signature: EVENTRIX_DEBUGGER_SIGNATURE, message });
};

chrome.runtime.onMessage.addListener(
    function(message) {
        console.log(message);
        sendEventrixDebuggerMessage('testing eventrix debugger');
    }
);


