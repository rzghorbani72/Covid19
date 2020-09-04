import axios from 'axios';

export function request(method = 'get', url) {
    if (method === 'get') {
        return axios
            .get(url)
            .then(response => {
                return response.data
            })
            .catch(err => {
                return err
            })
    }
}