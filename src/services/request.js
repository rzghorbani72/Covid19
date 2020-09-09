import axios from 'axios';

export function request(method = 'get', url) {
    if (method === 'get') {
        return fetch(url)
            .then(res => res.json())
            .then(result => {
                return result
            })
    }
}