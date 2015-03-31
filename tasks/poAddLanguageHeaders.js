'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {

  grunt.registerMultiTask(
    'poAddLanguageHeaders',
    'Workaround: Add Language header to po files (Onesky App doesn’t add it)',
    function() {
      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
        poDir: 'po/'
      });

      var dirs = fs.readdirSync(options.poDir);

      dirs.forEach(function(countryCode) {
        var xy = path.join(options.poDir, countryCode);
        if (!fs.lstatSync(xy).isDirectory())
          return;
        var poFiles = fs.readdirSync(xy);
        poFiles.forEach(function(poFile) {
          var poFilePath = path.join(options.poDir, countryCode, poFile);
          var content = fs.readFileSync(poFilePath, 'utf8');
          var searchStr = '\"Language: ' + poFile.replace('.po', '') + '\\n\"';
          var mimeStr = '\"MIME-Version: 1.0\\n\"';
          if (content.indexOf(searchStr) < 0) { // Language header not found, add it
            var result = content.replace(mimeStr, mimeStr + '\n' + searchStr);
            fs.writeFileSync(poFilePath, result, 'utf8');
          }
        });
      });
    });
};
