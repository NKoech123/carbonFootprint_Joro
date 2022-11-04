Fully tested REST API (Express.js, Sequelize-ORM, Chai ) that consumes banking transactions and calculates the amount of users’ carbon footprint based on the category (e.g food, transport, good and services) of transactions made by a user and other factors like diet (being vegan, vegetarian etc). Endpoint features include footprint of all users, of a specific user and footprint per day.


There are three endpoints:

* `/` which just returns the JSON object `{ server_status: 'working' }`
* `/dataFromExternalFinancialSources` hit it to run data from financial institutions
* `/transactions` which returns a list of banking transactions including the estimated carbon emission amounts
* `/footprint` returns all users' footprint
* `/footprintPerDay` returns all users' footprint per Day

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
