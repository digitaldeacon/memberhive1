# This project is abandoned.


# MemberHive
[![Build Status](https://travis-ci.org/digitaldeacon/memberhive.svg?branch=master)](https://travis-ci.org/digitaldeacon/memberhive)


Website: https://memberhive.com

Demo: https://demo.memberhive.com
```
Username: demo
Password: hsrtkjeshzyu
```

## Getting started developing
Make sure you have the following requirements installed:
* git 
* g++ compiler
* MongoDB 2.4
* imagemagick
* libkrb5-dev

`sudo apt-get install git libkrb5-dev imagemagick bzip2`

Create Datebase:
You need a mongodb == 2.4.x database. Copy the `server/datasources.local.json.example` file to `server/datasources.local.json` and adjust the settings.
   
Install process
* clone memberhive from git: `git clone git@github.com:digitaldeacon/memberhive.git`

```bash
curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash
nvm install 4.4
nvm use 4.4
nvm alias default 4.4
npm install -g bower gulp nodemon
cd memberhive/
npm install
bower install
```
* `npm test` *start node.js server* or `npm run debug` *to see debug output*
* `gulp surf` *Run local webserver (will compile SASS and ES6 files when changed)*

Docs for Loopback Services can be found [here](http://client-docs.memberhive.com/)

## Supported Versions of Software
* MongoDB == 2.4
* nodejs == 4.2.x
* angular == 1.4.x

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
## License
All files are made available under the terms of the GNU Affero General Public License (AGPL). See [LICENSE](https://github.com/digitaldeacon/memberhive/blob/master/LICENSE).
