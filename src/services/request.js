import axios from 'axios';

export const request = async (method = 'get', url) => {
    const headers = {
        'Accept': '*/*',
        'Connection': 'keep-alive'
    }
    if (method === 'get') {
        try {
            const response = await axios.get(url, {headers});
            return response.data
        }catch (e) {
            return e;
        }
    }
}