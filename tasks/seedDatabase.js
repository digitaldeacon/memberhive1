'use strict';

var path = require('path');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'seedDatabase'});


module.exports = function(grunt) {
  grunt.registerTask('seedDatabase',
    'Seed the databse with dummy data',
    function() {
      var options = this.options({
        dataSource: 'db',
        app: './server/server',
        config: './server/model-config',
        seeds: './server/seed/'
      });

      // load application
      var app;
      try {
        app = require(path.resolve(options.app));
      } catch (e) {
        var err = new Error('Cannot load application ' + options.app);
        err.origError = e;
        grunt.fail.warn(err);
      }

      // load configuration file
      var config;
      try {
        config = require(path.resolve(options.config));
      } catch (e) {
        var err = new Error('Cannot load models configuration ' + options.config);
        err.origError = e;
        grunt.fail.warn(err);
      }

      for (var model in config) {
        if (!config.hasOwnProperty(model))
          continue;
        var seedFile = path.join(options.seeds, model + '.json');
        if (!grunt.file.exists(seedFile))
          continue;

        var seeds = grunt.file.readJSON(seedFile);

        grunt.log.debug('Seed file for model ' +  model + ' found');

        var dataSource = app.dataSources[config[model].dataSource];
        for (var seed in seeds) {
          console.log(seeds[seed]);
          dataSource.models[model].upsert(seeds[seed]);
          log.info(dataSource.models[model]);
        }
      }

  });

};
