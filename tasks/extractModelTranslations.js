'use strict';

var Extractor = require('angular-gettext-tools').Extractor;

module.exports = function(grunt) {
  grunt.registerMultiTask(
    'extractModelTranslations',
    'Extracts strings to be translated for QueryBuilder from model.json files',
    function() {
      var extractor = new Extractor();

      this.files.forEach(function(file) {
        file.src.forEach(function (filename) {
          grunt.log.debug('Properties found in ' + filename + ':');
          var model = grunt.file.readJSON(filename);

          for (var property in model.properties) {
            if (!model.properties.hasOwnProperty(property) ||
                !model.properties[property].hasOwnProperty('queryBuilder'))
              continue;
            var prop = model.properties[property];
            grunt.log.debug('  ' + property);

            // Add label
            if (prop.queryBuilder.hasOwnProperty('label'))
              extractor.addString(filename, prop.queryBuilder.label, '', '', model.name);
            // Add values
            if (prop.queryBuilder.hasOwnProperty('values')) {
              for (var key in prop.queryBuilder.values) {
                if (!prop.queryBuilder.values.hasOwnProperty(key))
                  continue;
                var context = prop.queryBuilder.hasOwnProperty('label') ? prop.queryBuilder.label : model.name;
                extractor.addString(filename, prop.queryBuilder.values[key], '', '', context);
              }
            }
          }
          grunt.file.write(file.dest, extractor.toString());
        });
      });
    });
};
