'use strict';

var process = require('process');

module.exports = function(grunt) {
  grunt.registerMultiTask(
    'uploadWords',
    'Upload pot template files to onesky for translation',
    function() {
      this.files.forEach(function(file) {
        file.src.forEach(function(filename) {
          grunt.task.run(['uploadTemplateFile:' + filename]);
        });
      });

    });

  grunt.registerTask(
    'uploadTemplateFile',
    'Upload a single pot template file',
    function(filename) {
      grunt.log.ok('Uploading ' + filename);
      var options = this.options({
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

      onesky.string.upload(options.platformId, filename, options.format, function(err, data) {
       done(err === null);
       grunt.log.ok('Upload was successful. Strings will be processed by OneSky shortly.');
      });

    });
};
