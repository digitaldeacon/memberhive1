# MemberHive
![AngularJS](http://digital-deacon.org/i/memberhive/angularjs.png) &nbsp; ![Strongloop](http://digital-deacon.org/i/memberhive/strongloop.png) &nbsp; ![ES6](http://digital-deacon.org/i/memberhive/es6.png) &nbsp; ![MongoDB](http://digital-deacon.org/i/memberhive/mongodb.png)

[![Build Status](https://travis-ci.org/digitaldeacon/memberhive.svg?branch=master)](https://travis-ci.org/digitaldeacon/memberhive)

## Getting started
Make sure you have the following requirements installed:
* git 
* g++ compiler
* MongoDB 2.4
* libpng-dev

Install process
* `curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash` *install nvm*
* `nvm install 4.2` *install nodejs 4.2*
* `nvm alias default 4.2`
* `npm install -g bower gulp nodemon`
* clone memberhive from git: `git clone git@github.com:digitaldeacon/memberhive.git`
* `cd memberhive/`
* `npm install` *Install dev dependencies*
* `bower install` *Install app dependencies*
* Follow the persisting data instructions below
* `npm test` *start node.js server* or `npm run debug` *to see debug output*
* `gulp surf` *Run local webserver (will compile SASS and ES6 files when changed)*


## Supported Versions of Software
* MongoDB == 2.4
* nodejs == 4.2.x
* angular == 1.4.x

## Persisting data

 By default, all data is stored using the [Loopback's memory connector](http://docs.strongloop.com/display/public/LB/Memory+connector).
 It can be used to test the application without setting up a database.
 
 However, to persist your data, you should setup a MongoDB database.
 Copy the `server/datasources.local.json.example` file to `server/datasources.local.json` 
 and adjust the settings. You need to manually create the database.

## Example data

To get started with some example data, import the data in `resources/exampledata` using `mongoimport`, e.g.:

`mongoimport --db memberhive-dev resources/exampledata/Person.json`

## Translations

Check the [Translations Wiki Page](https://github.com/digitaldeacon/memberhive/wiki/Translations)

## Style Guides

Please follow these style guides when writing code:

* [AngularJS Style Guide by mgechev](https://github.com/mgechev/angularjs-style-guide)
* [AngularJS Style Guide by johnpapa](https://github.com/johnpapa/angularjs-styleguide)
* [Frontend Guidelines](https://github.com/bendc/frontend-guidelines)

## 3rd Party Drop-Ins
* [Angular-Gettext] (https://angular-gettext.rocketeer.be/dev-guide/)

## Dependencies
* NPM
* gulp
* bower
* nodejs
* strongloop
* [babel] (https://github.com/babel/babel)
* ECMAScript 6 (ES6)

## License
All files are made available under the terms of the GNU Affero General Public License (AGPL). See [LICENSE](https://github.com/digitaldeacon/memberhive/blob/master/LICENSE).
