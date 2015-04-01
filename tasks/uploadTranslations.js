'use strict';

var process = require('process');

module.exports = function(grunt) {
  grunt.registerTask(
    'uploadTranslations',
    'Uploads the template.pot file to OneSky for translation',
    function() {
      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
        templateFile: 'po/template.pot',
        platformId: '', // = Project ID
        format: 'GNU_POT'
      });

      var done = this.async();

      var publicKey = process.env.ONESKY_API_PUBLIC_KEY;
      var privateKey = process.env.ONESKY_API_PRIVATE_KEY;
      if (publicKey === undefined || privateKey === undefined) {
        grunt.fail.warn('Please make sure you have the environment variables ' +
            '"ONESKY_API_PRIVATE_KEY" and "ONESKY_API_PUBLIC_KEY" set.');
      }

      var onesky = require('onesky')(publicKey, privateKey);

      onesky.string.upload(options.platformId, options.templateFile, options.format, function(err, data) {
        done(err === null);
        grunt.log.ok('Upload was successful. Strings will be processed by OneSky shortly.');
      });

    });
};
