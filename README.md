# Ticket-galore
#### https://pacific-fortress-96034.herokuapp.com/
#### https://github.com/grmrh/ticket-galore

This application allows the user to post the sport tickets to sell in the site "Ticket-galore". The tickets posted in some reason cannot be used by the owner or cooperate. Thus people put them in the market with (deeply) discounted prices.

## Single-page application built with
* node
* express
* mysql, sequelize
* handlebars, handlebars-helper
* passport, passport-google-oauth2
* express-session, cookie-session
* mocha, chai, chai-http
* util: path, moment

## Design architecture
* MVC with
* router

## Usage
* Currently the site authenticates only with goole. Google account is required to use this web application.
* One can choose the preferred ticket categories using the button in the header that opens in a modal. This selection is persistent to database for a user.
* One can view all tickets in the market avaiable to purchase.
* one can manage the ticket contents that belong to her/him: available tickets, traded tickets, update posted ticket properties, that is, the user can controle the requesting price at any time.
* The user is able to add more tickets as they wish.

## Database 
* mysql and JAWS_DB in heroku
* Five tables - ticket trade, ticket, user interest, lookup for ticket category and of course user. Ticke_trade table is centeral.

## Authors
* **Grace Rhee** 
* **Don Casanova**
* **Amal Hassam**
* **Andrew Lilly**

## Questions/suggestions
* Please direct all questions/suggestions to Grace Rhee.
