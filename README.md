# Collective Technical test 🚀

## Mission 🥅
Building a web application that shows the first 150 ranked crypto currencies from CoinCap API.

## Demo 🎆
https://user-images.githubusercontent.com/43049559/140665601-19e2d016-03ac-4582-ad39-ae94244fa876.mp4

[live demo](https://sharp-snyder-625092.netlify.app/)

## Implementation 💻 
There are 2 technical aspects:
1. web server built using Typescript and nodeJS
2. a SPA web app built using Typescript and reactJS

## How does it work ? ❓
- On the server side <br />
The server gets the data from CoinCap API every 10 secondes and stores it locally in its cache. <br />

There are 2 endpoints :
1. `/api/fetch-cryptos`: returns the list of 150 currencies
2. `/api/search` : returns a list of crypto currencies matching the query parameters

- On the client side <br />

There are 4 features :
1. The client can see the 150 currencies through a Data grid
2. The client can add one or many currencies to its watchlist
3. The client can search through the list of currencies by the crypto name
4. Filtering or sorting the grid 

## How can you run the project locally ? 🤔
Run the server
```
git clone 
cd collective-technical-test
cd server
npm i
npm run dev
```

And in another terminal, run the web app
```
cd collective-technical-test
cd collective-web-app
npm i
npm run start
```

## How to run the tests ? 😫
```
cd collective-technical-test/server
npm run test
```

## What would I improve ? 👷

Obviously, this is still a pretty simple application and there are tons of way to improve it. Here are some ideas to improve this product :
- adding observability to the application (think sentry, datadog and such tools)
- adding more tests (+ end-to-end test on the front-end)
- adding a wallet feature (either via an integration with existing tools such as Coinbase or allowing an user to add its portfolio)
- adding a notification feature if a certain crypto currency matches a criteria
- there is still a way to improve the readability and maintanability of this code by re-structuring the code and using TS at its full potential (i.e. I think it's far from perfect)
- an improved error handling on the server-side (when the server fails to query CoinCap API due to the API query limitation, it returns a 200 with an empty array, this could be improved)
- ...

Overall, I would say that this is a working product but it could still be improved in terms of features as well as code (reducing the lines of code per file for each component by splitting the styling from the logic into 2 separate files, switching from one tab to another is quite slow and could be improved, removing hardcoded arrays to map and re-structure the code a bit, naming).
