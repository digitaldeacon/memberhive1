# gemmii-web
The Repo for the Angular UI side of gemmii

![My image](http://bible-survey.org/i/gemmii/angularjs.png) &nbsp; ![My image](http://bible-survey.org/i/gemmii/strongloop.png) &nbsp; ![My image](http://bible-survey.org/i/gemmii/es6.png) &nbsp; ![My image](http://bible-survey.org/i/gemmii/mariadb.png)

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
* `npm install -g jspm grunt-cli nodemon`
* clone gemmii-web from git: `git https://github.com/ebtc/gemmii-web.git`
* cd to gemmi-web/
* `npm install` *Install dev dependencies*
* `jspm install` *Install app dependencies*
* Follow the persisting data instructions below
* `npm start` *start io.js server*
* NOTE: there is a minor issue with the way jspm adds the dependencies for two jQuery plugins. Please refer to the section jspm Dependencies below to compare your config.js with the code below
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

## JSPM Dependency issues

JSPM has a powerful way to circumvent possible dependency clashes. However, his feature makes it hard to get the many dependencies right. In order to circumvent forking every plugin that does not behave we use local overwrites. These are attached at the bottom of the package.json.

There are two jQuery plugins that expose weird dependencies. So far we have not yet found a way to automatically do this last step. After you ran `jspm install` the installer will have created (if it does not exist) the config.js in the app folder. In this you find a complex map of all dependencies.

The two plugins that cause errors are the Advanced-Dashboard-Framework and the jQuery-QueryBuilder. You will notice a line that exposes the name for angular (on the left) and the path to where the files are (on the right). Somewhere below you will find the dependency mappings. Whatever jspm has installed for you, it should look more like this:

    "github:mistic100/jQuery-QueryBuilder@1.4.2": {
      "bootstrap": "github:twbs/bootstrap@3.3.4",
      "jQuery.extendext": "github:mistic100/jQuery.extendext@0.1.1",
      "jquery": "github:components/jquery@1.11.2",
      "microevent": "npm:microevent-mistic100@2.1.1",
      "moment": "npm:moment@2.9.0"
    },
    "github:sdorra/angular-dashboard-framework@0.7.0": {
      "angular": "github:angular/bower-angular@1.2.28",
      "angular-bootstrap": "github:angular-ui/bootstrap-bower@0.12.0",
      "bootstrap": "github:twbs/bootstrap@3.3.4",
      "ui-sortable": "github:angular-ui/ui-sortable@0.13.0",
      "jquery": "github:components/jquery@1.11.2",
      "jquery-ui": "github:components/jqueryui@1.11.3"
    },

In a future relase of this software we will have this issue solved. One way of doing this is to build packages and lock all dependencies (see jspm documentation for this).

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
