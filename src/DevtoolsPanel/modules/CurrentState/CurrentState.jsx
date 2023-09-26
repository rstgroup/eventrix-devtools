import React, {useCallback, useEffect} from 'react';
import { useEmit, useEventrixState } from 'eventrix';
import { ObjectInspector } from "react-inspector";
import {Stack} from "@mui/material";

import {STATE_FETCH} from "../../events";

const CurrentState = () => {
    const emit = useEmit();
    const [currentState = []] = useEventrixState('currentState');
    const fetchState = useCallback(() => { emit(STATE_FETCH) }, [emit]);

    useEffect(() => {
        fetchState()
    }, [fetchState]);
    return (
        <Stack width="100%" >
            <ObjectInspector data={currentState} />
        </Stack>
    )
};

export default CurrentState;
