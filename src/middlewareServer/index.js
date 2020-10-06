const express = require('express'),
    rp = require('request-promise'),
    Promise = require('bluebird'),
    cors = require('cors')
const app = express()
const port = 9000

function fetchData(url) {
    return rp(
        {
            method: 'GET',
            uri: url,
            json: true
        });
}
app.use(cors())
app.options('*', cors())
app.get('/timeline/:code', async (req, res) => {
    const code = req.params.code
    console.log('/timeline/' + code)
    let result;
    if (code === 'total') {
        result = await fetchData(`https://thevirustracker.com/timeline/map-data.json`)
    } else {
        result = await fetchData(`https://thevirustracker.com/free-api?countryTimeline=${code}`)
    }
    return res.json(result)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})