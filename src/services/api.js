import {base_url_covid19api, base_url_local} from '../constants/config'

export const api = {
    //getTimeLine: (code) => `${base_url_thevirustracker}/free-api?countryTimeline=${code}`,
    getTimeLine: (code) => `${base_url_local}/timeline/${code}`,
    getSummaryCovid19Api: () => `${base_url_covid19api}/summary`,
}