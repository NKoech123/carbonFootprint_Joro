# Joro Back-End Coding Challenge

This app is a toy version of Joro's carbon footprint calculator.   It is an API that designed to be used with a mobile app like Joro's. Since it has been built for the coding challenge it doesn't feature any of the authentication, authorization or other production features that would normally be present.

If you pass the code challenge we will also use this app for our code pairing interview, since it is a codebase that both you and we will be familiar with.

To complete the coding challenge you will be required to add some features (listed below) along with tests. There are lots of different ways to complete the challenge so we are not looking for the one "right" way. Our general advice is:

*  Follow the structure and patterns of the code as you find them
*  If you don't want follow certain patterns please explain why (there are always better ways to do things)
*  You can make any changes you want (add new files, add packages, change models, change the structure of the database etc) but none of these things are required
*  Aim for decent test coverage for any code you add. 100% coverage is not required

## Description of the current app

This is a JSON API app built in Express.js and backed by a sqlite3 database. It is based on a small part of the current Joro API, the part which consumes banking transactions and calculates the estimated carbon emissions of those transactions by applying a multiplier to the transaction dollar amount. The multiplier is different depending on which category the transaction has been assigned to.

There are three endpoints:

* `/` which just returns the JSON object `{ server_status: 'working' }`
* `/transactions` which returns a list of banking transactions including the estimated carbon emission amounts
* `/footprint` which currently returns an empty footprint object

The transactions are stored in the `transactions` table, and each transaction belongs to a user, stored in the `user` table. The `models/` directory contains the [Sequelize](https://sequelize.org) models that access those tables. The `footprintCalculator.js` file contains the basic service functions that connect those models with the simple routes in `app.js`. Tests live in the `tests/` directory.

## Set up

* Make sure you have `sqlite3` installed. It is usually already there in Macs.
* Run `yarn install`
* Create the databases by running:
	* `npx sequelize-cli db:migrate`
	* `NODE_ENV=test npx sequelize-cli db:migrate`
* Pre-populate the data with `npx sequelize-cli db:seed:all`
* Run the tests with `yarn test`
* Run the server with `yarn dev`

## Features to add:
_note: This is a new code challenge for us and we're not yet sure how much we should ask you to do. You will_ **not** _be penalized if you decide not to do either or both of the optional extra features, but if you want to tackle them please do. And please give us any feedback you have about this challenge._

* The transactions in the file `transactions_to_import.csv` should be imported. Treat this file as if it were the endpoint of a 3rd party API that was regularly providing this app with new transactions for the users -- that is, the app has to have some way of importing the data on request, not as part of startup. The categories in the CSV are from the financial institutions the users belong to so they need to be mapped to our categories. The existing categories should cover almost all of transactions but some of the transactions do not map to any category since they don't generate carbon emissions. Think about what to do with those transactions.
* The `/footprint` route currently returns an empty object. Add a footprint calculation that shows the total carbon footprint for all users, and breaks it down into the carbon categories.
* OPTIONAL EXTRA: break out the footprint into per-day summaries.
* OPTIONAL EXTRA: if a user has the flag `isVegetarian=true` their food carbon should have a lower weighting than the default food transactions. Use `0.30` for this vegetarian weighting. Handle this case in the `Transaction.prototype.carbonAmount` function.

## How to return you challenge to Joro

You should assume we will run the same setup steps you did (the ones listed above) so delete your databases and the contents of `/node_modules` before you return the code to us. Feel free to add any notes to this README or a new file. Zip up the directory and attach to an email addressed to [nick@joro.tech](mailto:nick@joro.tech). You do not need to include a git repo.

Email the same address if you have _any_ questions and if you want to give us any feedback we will be very grateful.
# carbonFootprint_Joro
