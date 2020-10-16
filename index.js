// API for the restaurant list
var resListURL = 'https://data.baltimorecity.gov/api/views/k5ry-ef3g/rows.json';
//API for the webHook for posting the result
var webHook = 'https://webhook.site/61f09650-83b9-4ccc-8fee-8cc3b63c49f0';

//const https = require('https');
//superagent
const superagent = require('superagent');


//
function parseJSON(urlRes) {
    var nameResponse;
    if(urlRes.status==200){
    try {
        nameResponse = JSON.parse(JSON.stringify(urlRes));
    } catch (e) {
      if (e instanceof SyntaxError) {
        printError(e, true);
    } else {
        printError(e, false);
    }
    }
  }
    return nameResponse; // Could be undefined!
}
//main method to call the restaurant list api
async function callARestaurantApi() {
    const restList = [];
    const UrlResponse = await superagent.get(resListURL);
    var nameResponse = parseJSON(UrlResponse);
    if (nameResponse.status >= 200 && nameResponse.status <= 299) {
    
    var length = Object.keys(JSON.parse(nameResponse.text).data).length;
    console.log(`Total Restaurants:  ${length}`);
    console.log("Restaurants List");
  
    for (var i = 0; i < length; i++) {
        restList[i] = encodeURI(JSON.parse(nameResponse.text).data[i][8]);
    }
  }
    return restList;
    // postWebHook(restList);
}

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

callARestaurantApi()
    .then(data => postWebHook(data))
    .catch(err => console.error(err))
   
   // module.exports={ callARestaurantApi}