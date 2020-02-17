const rpn = require('request-promise-native');

async function fetchAddress(longitude, latitude) {
    const res = await rpn({
        uri: 'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc',
        qs: {
            orders: 'roadaddr',
            coords: `${longitude},${latitude}`,
            output: 'json'
        },
        headers: {
            'X-NCP-APIGW-API-KEY-ID': '5w2twxe8nk',
            'X-NCP-APIGW-API-KEY': 'WzVKPwp1SdgjFKnSE38HTpQIhWAXRHvhcE6tgIG4',
        },
    })
    console.log(res)
    const resJson = JSON.parse(res)
    console.log(resJson)
    const region = resJson.results[0].region;
    console.log(region)

    return {
        area1: region.area1.name,
        area2: region.area2.name,
        area3: region.area3.name,
    }
};

module.exports = fetchAddress;
