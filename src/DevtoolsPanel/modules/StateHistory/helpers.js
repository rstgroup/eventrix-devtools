export const getStateUpdateStats = (stateHistory) => {
    const stateUpdateStats = stateHistory.reduce((stats, item) => {
        if (!stats[item.path]) {
            stats[item.path] = 0;
        }
        stats[item.path] += 1;
        return stats;
    }, {});
    return Object.keys(stateUpdateStats).map(stateName => ({
        stateName,
        count: stateUpdateStats[stateName],
    })).sort((a, b) => b.count - a.count);
};