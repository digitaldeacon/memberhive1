# MemberHive
![AngularJS](http://digital-deacon.org/i/memberhive/angularjs.png) &nbsp; ![Strongloop](http://digital-deacon.org/i/memberhive/strongloop.png) &nbsp; ![ES6](http://digital-deacon.org/i/memberhive/es6.png) &nbsp; ![MongoD](http://digital-deacon.org/i/memberhive/mongodb.png)

## Getting started
Make sure you have the following requirements installed:
* git 
* g++ compiler
* ruby-dev (e.g. ruby1.9.1-dev), compass
* MySQL or MariaDB
* libpng-dev

Install process
* `curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash` *install nvm*
* `nvm install iojs` *install iojs*
* make sure you have iojs added to your PATH variable (e.g. `export PATH="$PATH:$HOME/.nvm/versions/io.js/v1.6.3/bin"`)
* `npm install -g jspm grunt-cli`
* clone gemmii-web from git: `git https://github.com/ebtc/gemmii-web.git`
* cd to gemmi-web/
* `npm install` *Install dev dependencies*
* `jspm install` *Install app dependencies*
* Follow the persisting data instructions below
* `npm start` *start io.js server* or `DEBUG=loopback:datasource npm start` *to see debug output*
* `grunt serve` *Run local webserver (will compile SASS and ES6 files when changed)*

## Persisting data

 By default, all data is stored using the [Loopback's memory connector](http://docs.strongloop.com/display/public/LB/Memory+connector).
 It can be used to test the application without setting up a database.
 
 However, to persist your data, you should setup a MySQL/MariaDB database.
 Copy the `server/datasources.local.json.example` file to `server/datasources.local.json` 
 and adjust the settings. You need to manually create the database.
 
 After that, run `grunt dbmigrate`, which will create the tables and update them if the model changes.
 This task is also run each time the grunt default or `serve` task is executed.
 
 You can get sample data for users here: [generatedata.com](http://www.generatedata.com/).

## Translations

Check the [Translations Wiki Page](https://github.com/ebtc/gemmii-web/wiki/Translations)

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
* [Metronic] (http://www.keenthemes.com/preview/)
* [Angular-Gettext] (https://angular-gettext.rocketeer.be/dev-guide/)

## Dependencies
* NPM
* JSPM
* Grunt
* io.js (a node.js fork)
* strongloop
* [babel transpiler (formely 6to5)] (https://github.com/babel/babel)
* ECMAScript 6 (ES6)
* [wkhtmltopdf] (http://wkhtmltopdf.org/)

## Debug
* `DEBUG=loopback:datasource npm start` to show debug ouput of the loopback database

## License
All files are made available under the terms of the GNU Affero General Public License (AGPL).
