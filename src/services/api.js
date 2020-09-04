import {base_url_thevirustracker,base_url_covid} from '../constants/config'
export const api = {
    getEachCountryTimeLineApi : (countryCode)=>`${base_url_thevirustracker}/free-api?countryTimeline=${countryCode}`,
    getGlobeStatsApi : (countryCode)=>`${base_url_thevirustracker}/free-api?global=stats`,
    getAllCountriesTimeLineApi : () => `${base_url_thevirustracker}/timeline/map-data.json`,
    getRegionsIsoNameApi : () => `${base_url_covid}/api/regions`,
    getProvinceLatLangApi : (iso) => `${base_url_covid}/api/provinces/${iso}`
}