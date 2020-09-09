import {base_url_covid19api} from '../constants/config'

export const api = {
    getTimeLine: (code) => `${base_url_covid19api}/dayone/country/${code}`,
    getSummaryCovid19Api: () => `${base_url_covid19api}/summary`,
}