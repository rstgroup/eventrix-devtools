const REACT_COMPONENTS_FORM_DEBUGGER_SIGNATURE = 'reactComponentsFormDebugger';

const sendEventrixDebuggerMessage = (message) => {
    chrome.runtime.sendMessage({ signature: REACT_COMPONENTS_FORM_DEBUGGER_SIGNATURE, message });
};

chrome.runtime.onMessage.addListener(
    function(message) {
        console.log(message);
        sendEventrixDebuggerMessage('testing eventrix debugger');
    }
);


