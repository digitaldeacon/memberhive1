# MemberHive
![AngularJS](http://digital-deacon.org/i/memberhive/angularjs.png) &nbsp; ![Strongloop](http://digital-deacon.org/i/memberhive/strongloop.png) &nbsp; ![ES6](http://digital-deacon.org/i/memberhive/es6.png) &nbsp; ![MongoDB](http://digital-deacon.org/i/memberhive/mongodb.png)

## Getting started
Make sure you have the following requirements installed:
* git 
* g++ compiler
* ruby-dev (e.g. ruby1.9.1-dev), compass
* MongoDB 2.6
* libpng-dev

Install process
* `curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash` *install nvm*
* `nvm install iojs` *install iojs*
* make sure you have iojs added to your PATH variable (e.g. `export PATH="$PATH:$HOME/.nvm/versions/io.js/v1.6.3/bin"`)
* `npm install -g jspm grunt-cli`
* clone memberhive from git: `git clone git@github.com:digitaldeacon/memberhive.git`
* `cd memberhive/`
* `npm install` *Install dev dependencies*
* `jspm install` *Install app dependencies*
* Follow the persisting data instructions below
* `npm start` *start io.js server* or `npm run debug` *to see debug output*
* `grunt serve` *Run local webserver (will compile SASS and ES6 files when changed)*

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

## Publish app
* `grunt` (Builds the app in the `dist` directory)
* Copy `dist` folder to webserver

## 3rd Party Drop-Ins
* [ADF] (https://github.com/sdorra/angular-dashboard-framework/tree/master/src)
* [Weather Icons] (https://github.com/erikflowers/weather-icons)
* [ViewHead] (https://github.com/apparentlymart/angularjs-viewhead) - sets the Browser Title
* [Angular-Gettext] (https://angular-gettext.rocketeer.be/dev-guide/)

## Dependencies
* NPM
* JSPM
* Grunt
* io.js (a node.js fork)
* strongloop
* [babel transpiler (formely 6to5)] (https://github.com/babel/babel)
* ECMAScript 6 (ES6)

## License
All files are made available under the terms of the GNU Affero General Public License (AGPL).
