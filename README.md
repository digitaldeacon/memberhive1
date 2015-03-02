# gemmii-web
The Repo for the Angular UI side of gemmii

![My image](http://bible-survey.org/i/gemmii/angularjs.png) &nbsp; ![My image](http://bible-survey.org/i/gemmii/strongloop.png) &nbsp; ![My image](http://bible-survey.org/i/gemmii/es6.png) &nbsp; ![My image](http://bible-survey.org/i/gemmii/mariadb.png)

## Getting started
* `curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash` *install nvm*
* `nvm install iojs` *install iojs*
* `sudo npm install -g bower`
* `sudo npm install -g grunt-cli`
* `npm install` *Install dev dependencies*
* `bower install` *Install app dependencies*
* `node . &` *start nodejs server* (it should actually be the iojs server now)
* `grunt serve` *Run local webserver (will compile SASS and ES6 files when changed)*

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
* [Metronic] (http://www.keenthemes.com/preview/)

## Dependencies
* NPM
* Bower
* Grunt
* io.js (a node.js fork)
* strongloop
* [babel transpiler (formely 6to5)] (https://github.com/babel/babel)
* ECMAScript 6 (ES6)
