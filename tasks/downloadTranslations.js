'use strict';

var process = require('process');
var path = require('path');
var fs = require('fs');

module.exports = function(grunt) {

  grunt.registerTask(
    'downloadTranslations',
    'Downloads translations from OneSky',
    function() {
      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
        locales: []
      });

      options.locales.forEach(function(locale) {
        grunt.task.run(['downloadSingleTranslation:' + locale]);
      });

    });

  grunt.registerTask(
    'downloadSingleTranslation',
    'Downloads a translation for a certain locale',
    function(locale) {
      var options = this.options({
        poDir: 'po/',
        platformId: '', // = Project ID
        format: 'GNU_POT',
        tag: 'template.pot' // = Uploaded file name
      });

      var publicKey = process.env.ONESKY_API_PUBLIC_KEY;
      var privateKey = process.env.ONESKY_API_PRIVATE_KEY;
      if (publicKey === undefined || privateKey === undefined) {
        grunt.fail.warn('Please make sure you have the environment variables ' +
        '"ONESKY_API_PRIVATE_KEY" and "ONESKY_API_PUBLIC_KEY" set.');
      }
      var onesky = require('onesky')(publicKey, privateKey);
      var done = this.async();

      onesky.string.download(options.platformId, locale, options.tag, options.format, function(err, data) {
        if (err === null) {
          var poFilePath = path.join(options.poDir, locale, locale + '.po');
          fs.writeFileSync(poFilePath, data, 'utf8');
        }

        done(err === null);
        grunt.log.ok('Successfully downloaded locale ' + locale + '.');
      });
    });
};
