import axios from 'axios';

export const request = async (method = 'get', url) => {
    if (method === 'get') {
        try {
            const response = await axios.get(url);
            return response.data
        }catch (e) {
            return e;
        }
    }
}