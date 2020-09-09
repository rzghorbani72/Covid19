import {base_url_thevirustracker,base_url_covid,base_url_covid19api,base_url_local} from '../constants/config'
export const api = {
    getEachCountryTimeLineThevirusApi : (countryCode)=>`${base_url_thevirustracker}/free-api?countryTimeline=${countryCode}`,
    getGlobeStatsApi : ()=>`${base_url_thevirustracker}/free-api?global=stats`,
    getTimeLine:(code)=>`${base_url_covid19api}/dayone/country/${code}`,
    // getAllCountriesTimeLineThevirusApi : () => `${base_url_thevirustracker}/timeline/map-data.json`,
    getRegionsIsoNameApi : () => `${base_url_covid}/api/regions`,
    getProvinceLatLangApi : (iso) => `${base_url_covid}/api/provinces/${iso}`,
    getSummaryCovid19Api : () => `${base_url_covid19api}/summary`,
    getCountriesCovid19Api : () => `${base_url_covid19api}/countries`,
    getEachCountryTimeLineCovid19Api : (country) => `${base_url_covid19api}/country/${country}`,
}