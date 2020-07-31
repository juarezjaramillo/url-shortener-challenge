function updateOptions(options) {
    const update = { ...options };
    update.headers = {
        'Content-Type': 'application/json',
        ...update.headers,
    }
    return update;
}

export default function fetcher(url, options) {
    return fetch(url, updateOptions(options));
}