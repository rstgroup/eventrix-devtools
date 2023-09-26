import React, {useState} from 'react';
import {useEmit, useEvent, useEventrixState} from 'eventrix';
import {Button, Stack} from "@mui/material";

import TextField from "@mui/material/TextField";
import TextareaField from "./TextareaField";
import {EMITTER_EMIT, RESET_EMITTER} from "../../events";

const Emitter = () => {
    const emit = useEmit();
    const [eventName, setEventName] = useEventrixState('emitter.eventName');
    const [eventPayload, setEventPayload] = useEventrixState('emitter.eventPayload');

    useEvent(RESET_EMITTER, () => {
        setEventName('');
        setEventPayload('');
    });
    return (
        <Stack width="100%" spacing={1} direction="row">
            <Stack width="100%" spacing={2}>
                <TextField  size="small" onChange={(e) => setEventName(e.target.value)} value={eventName} label="Event name" />
                <TextareaField onChange={(e) => setEventPayload(e.target.value)} value={eventPayload} label="Event payload" />
            </Stack>
            <Stack>
                <Button  onClick={() => emit(EMITTER_EMIT, { eventName, eventPayload })} variant="contained">Emit</Button>
            </Stack>
        </Stack>
    )
};

export default Emitter;
