# ordermark

NodeJS applicaiton to fetch restaurant list from an API, parse the JSON to extract the restaurant list and post that list on a Webhook. 

The app has a depedency on SuperAgent which is a module to make HTTP request. 

##Files

**package.json: contains the dependecies, name, author, version etc 

**index.js: contains the logic. It has three functions

    **callARestaurantApi: Make the HTTP API call and gets the response and send to the json parser
    
    **parseJSON: parses the response and return the array of restaurant names
    
    **postWebHook: posts the  data(array of restaurants anmes) on webhook.site


# How to run the app

(From the folder containing index.js)
download the project. Install node
 run node index.js in the terminal

# Output

Total Restaurants:  {Total numbers of restaurants fetched}
The restaurant list has been posted. 


# Assumptions
1. The response from the restaurant API has consistent format with the restaurant name on the same index everytime,
2. If the API throws an error, I log it and exit. No retries. 
3. The restaurant list is big enough to be sent in the data for a post request. 

##With Webhook.site, we instantly get a unique, random URL that we can use to test and debug Webhooks and HTTP requests. After a token is created, the URL at https://webhook.site/{token.uuid} becomes accessible.
