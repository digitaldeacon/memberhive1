# gemmii-web
The Repo for the Angular UI side of gemmii

![My image](http://bible-survey.org/i/gemmii/angularjs.png) ![My image](http://bible-survey.org/i/gemmii/strongloop.png) ![My image](http://bible-survey.org/i/gemmii/es6.png) ![My image](http://bible-survey.org/i/gemmii/mariadb.png)

## Getting started
* `curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash` *install nvm*
* `nvm install iojs` *install iojs*
* `sudo npm install -g bower`
* `sudo npm install -g grunt-cli`
* `npm install` *Install dev dependencies*
* `bower install` *Install app dependencies*
* `node . &` *start nodejs server*
* `grunt serve` *Run local webserver (will compile SASS and ES6 files when changed)*

## Style Guides

Please follow these style guides when writing code:

* [AngularJS Style Guide](https://github.com/mgechev/angularjs-style-guide)

## Publish app
* `grunt` (Builds the app in the `dist` directory)
* Copy `dist` folder to webserver
