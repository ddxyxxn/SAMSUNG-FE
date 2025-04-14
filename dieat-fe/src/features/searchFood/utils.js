export function groupByName(list) {
    const map = new Map();
    list.forEach(item => {
        if (!map.has(item.name)) {
            map.set(item.name, item);
        }
    });
    return Array.from(map.values());
}