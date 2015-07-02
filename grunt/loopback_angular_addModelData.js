/*
 * grunt-loopback-angular-addmodeldata
 * Originally from https://github.com/mrjrdnthms/grunt-loopback-angular-addModelData
 *
 * Copyright (c) 2014 Jordan Thomas
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  grunt.registerMultiTask(
    'loopback_angular_addModelData',
    'Extends grunt-loopback-angular. Auto-generated Angular $resource services for loopback will include model data for use at runtime on angular clients',
    function() {
      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
        modelConfig: 'server/model-config.json',
        modelDir: 'common/models',
        serviceFile: 'client/app/model/core/services/lb-services.js'
      });

      var serviceFile;
      try {
        serviceFile = grunt.file.read(options.serviceFile);
        grunt.verbose.ok('Loaded LoopBack service file %j', options.serviceFile);
      } catch (e) {
        var errService = new Error('Cannot load LoopBack service file ' + options.serviceFile);
        errService.origError = e;
        grunt.fail.warn(errService);
      }

      var models;
      try {
        models = require(path.resolve(options.modelConfig));
        grunt.verbose.ok('Loaded LoopBack models file %j', options.modelConfig);
      } catch (e) {
        var err = new Error('Cannot load LoopBack models file ' + options.modelConfig);
        err.origError = e;
        grunt.fail.warn(err);
      }
      for (var modelName in models) {
        if (models[modelName].public) {
          // Convert model name to filename
          var fileName = modelName.charAt(0).toLowerCase() + modelName.slice(1);
          fileName = fileName.replace(/([A-Z])/g, function($1) {
            return `-${$1.toLowerCase()}`;
          });
          grunt.verbose.ok(`Checking ${modelName}`);
          try {
            var model = require(path.resolve(options.modelDir + fileName + '.json'));
            for (var prop in model.properties) {
              model.properties[prop].key = prop;
            }
            var regex = new RegExp(`(module\\.factory\\([\\s]*\"${modelName}\"[\\s\\S]*?)(return R;)`);
            var replace = '$1' + 'R.model=' + JSON.stringify(model) + ';\n\n' + '$2';
            serviceFile = serviceFile.replace(regex, replace);
          } catch (e) {
            grunt.log.warn(`Could not find model file ${fileName}.json`);
          }
        }
      }

      grunt.file.write(options.serviceFile, serviceFile);
      grunt.log.ok('Modified angular services to include a new property "model" which holds the model json object');
    });

};
