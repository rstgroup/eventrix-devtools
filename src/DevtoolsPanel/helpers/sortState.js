export const sortState = (currentState) => {
    const alphabeticallySortedCurrentState = {};
    Object.keys(currentState)
        .sort()
        .forEach((state) => {
            Object.assign(alphabeticallySortedCurrentState, { [state]:  currentState[state]})
        });
    return alphabeticallySortedCurrentState;
}
