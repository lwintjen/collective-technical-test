# Collective Technical test

## Mission
Building a web application that shows the first 150 ranked crypto currencies from CoinCap API.

## Demo
https://www.loom.com/share/f8d2ef4b023e422f847a31896639ba1c <br />
[live demo](https://sharp-snyder-625092.netlify.app/)
## Implementation
There are 2 technical aspects:
1. web server built using Typescript and nodeJS
2. a SPA web app built using Typescript and reactJS

## How does it work ?
- On the server side <br />
The server gets the data from CoinCap API every 10 secondes and stores it locally in its cache. <br />

There are 2 endpoints :
1. `/api/fetch-cryptos`: returns the list of 150 currencies
2. `/api/search` : returns a list of crypto currencies matching the query parameters

- On the client side <br />

There are 3 features :
1. The client can see the 150 currencies through a Data grid
2. The client can add one or many currencies to its watchlist
3. The client can search through the list of currencies by the crypto name

## How can you run the project locally ?
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

## How to run the tests ?
```
cd collective-technical-test/server
npm run test
```

