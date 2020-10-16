// API for the restaurant list
var resListURL = 'https://data.baltimorecity.gov/api/views/k5ry-ef3g/rows.json';
// API for the webHook for posting the result 
var webHook = 'https://webhook.site/61f09650-83b9-4ccc-8fee-8cc3b63c49f0';
//superagent-To make http calls .
const superagent = require('superagent');

//function to parse the response from the Restaurant list API
function parseJSON(urlRes) {
    var nameResponse;

    if (urlRes.status == 200) {
        try {
            nameResponse = JSON.parse(JSON.stringify(urlRes));
        } catch (e) {
            if (e instanceof SyntaxError) {
                console.log(e, true);
            }
            else {
                console.log(e, false);
            }
        }
    }
    return nameResponse;
}


//function to make the HTTP API call and return the array of restaurant names
async function callARestaurantApi() {
    const restList = [];
    try {
        const UrlResponse = await superagent.get(resListURL);
        var nameResponse = parseJSON(UrlResponse);
        //suuccessfull
        if (nameResponse.status >= 200 && nameResponse.status <= 299) {
            const length = Object.keys(JSON.parse(nameResponse.text).data).length;
           
            console.log(`Total Restaurants:  ${length}`);
            // console.log("Restaurants List");

            for (var i = 0; i < length; i++) {
                restList[i] = (JSON.parse(nameResponse.text).data[i][8]);
            }
        }
    } catch (e) {
        if (e instanceof SyntaxError) {
            console,
            log(e, true);
        }
        else {
            console.log(e, false);
        }
    }
    return restList;
}
//post the restaurant list to webhook
async function postWebHook(restList) {
    superagent.post(webHook)
        .send(restList)
        .then((result) => {
            console.log(result.text)
        })
        .catch((err) => {
            console.log(err);
        });
}
//main function
callARestaurantApi()
    .then(data => postWebHook(data))
    .catch(err => console.error(err))