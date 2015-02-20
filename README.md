# gemmii-web
The Repo for the Angular UI side of gemmii

## Getting started
* `npm install -g bower grunt`
* `npm install grunt-angular-gettext --save-dev` *# For translations*
* `bower install`
* `grunt serve` *# Run local webserver (will compile SASS and coffee files when changed)*

## Style Guides

Please follow these style guides when writing code:

* [AngularJS Style Guide](https://github.com/mgechev/angularjs-style-guide).
* [CoffeeScript Style Guide](https://github.com/polarmobile/coffeescript-style-guide)
  * Exception: Lines can have up to 120 characters

## Publish app
* `grunt` (Builds the app in the `dist` directory)
* Copy `dist` folder to webserver
