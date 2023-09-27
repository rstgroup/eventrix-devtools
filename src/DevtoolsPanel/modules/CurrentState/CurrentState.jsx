import React, {useCallback, useEffect, useMemo} from 'react';
import { useEmit, useEventrixState } from 'eventrix';
import { ObjectInspector } from "react-inspector";
import {Stack} from "@mui/material";

import {STATE_FETCH} from "../../events";
import {sortState} from "./helpers";

const CurrentState = () => {
    const emit = useEmit();
    const [currentState = []] = useEventrixState('currentState');
    const fetchState = useCallback(() => { emit(STATE_FETCH) }, [emit]);
    const alphabeticallySortedCurrentState = useMemo(() => sortState(currentState), [currentState])
    useEffect(() => {
        fetchState()
    }, [fetchState]);
    return (
        <Stack width="100%" >
            <ObjectInspector data={alphabeticallySortedCurrentState} />
        </Stack>
    )
};

export default CurrentState;
