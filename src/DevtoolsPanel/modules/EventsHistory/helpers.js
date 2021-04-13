export const getEventsEmitStats = (eventsHistory) => {
    const eventsEmitStats = eventsHistory.reduce((stats, item) => {
        if (!stats[item.name]) {
            stats[item.name] = 0;
        }
        stats[item.name] += 1;
        return stats;
    }, {});
    return Object.keys(eventsEmitStats).map(name => ({
        name,
        count: eventsEmitStats[name],
    })).sort((a, b) => b.count - a.count);
};