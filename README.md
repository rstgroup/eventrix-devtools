![Eventrix](assets/logo_devtools.svg)

1. [Features](#features)
1. [Installation](#installation)
1. [License](#license)

### Features

- Current State
    - view current state
    - used state stats
- State history
    - list of state updates
    - state update preview
    - state updates stats
- Events History
    - list of emitted events
    - emitted event preview
    - emitted events stats
- Receivers list
- Listeners list

### Installation

Chose "chrome" catalog from repository in chrome extensions panel. Use EventrixDebugger in your application code.

```js
import { Eventrix, EventrixDebugger } from 'eventrix'

const eventrix = new Eventrix({});

const eDebugger = new EventrixDebugger(eventrix);
eDebugger.start();

export default eventrix;
```

### License

eventrix package are [MIT licensed](https://github.com/mprzodala/eventrix-devtools/blob/master/LICENSE)

### Powered by

[RST Software Masters](https://rst.software) look on RST [Github](https://github.com/rstgroup)
