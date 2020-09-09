export const base_url_thevirustracker = `https://thevirustracker.com`
export const base_url_covid = `https://covid-api.com`
export const base_url_local = `http://localhost:9000`
export const base_url_covid19api = `https://api.covid19api.com`
export const ui = {
    getTextColor: (title) => {
        switch (title) {
            case 'Country':
                return '#373737'
            case 'NewConfirmed':
                return '#6a1b9a'
            case 'TotalConfirmed':
                return '#38006b'
            case 'NewDeaths':
                return '#dd2c00'
            case 'TotalDeaths':
                return '#a30000'
            case 'NewRecovered':
                return '#2e7d32'
            case 'TotalRecovered':
                return '#005005'
            case 'Date':
                return '#0d47a1'

        }
    }
}