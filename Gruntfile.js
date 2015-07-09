'use strict';

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  var devServer = "https://localhost:3994/api";
  var prodServer = "https://memberhive.com:7007/api";

  // Configurable paths for the application
  var appConfig = {
    app: 'client/app',
    dist: 'dist',
    api: {
      development: devServer,
      production: prodServer
    }
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    extractModelTranslations: {
      all: {
        files: {
          'po/models.pot': ['common/models/*.json']
        }
      }
    },

    loopback_angular_addModelData: { // jshint ignore:line
      services: {
        options: {
          modelConfig: 'server/model-config.json',
          serviceFile: '<%= yeoman.app %>/modules/core/services/lb-services.js',
          modelDir: 'common/models/'
        }
      }
    },

    docularserver: {
      targetDir: 'docs',
      livereload: true,
      port: 8000
    },

    docular: {
      docular_webapp_target: 'docs', // jshint ignore:line
      groups: [
        {
          groupTitle: 'LoopBack',
          groupId: 'loopback',
          sections: [
            {
              id: 'lbServices',
              title: 'LoopBack Services',
              scripts: ['<%= yeoman.app %>/modules/core/services/lb-services.js']
            }
          ]
        }
      ]
    },

    uploadWords: {
      all: {
        src: 'po/*.pot'
      }
    },

    uploadTemplateFile: {
      options: {
        platformId: '22316',
        format: 'GNU_POT'
      }
    },

    downloadTranslations: {
      options: {
        locales: ['de', 'en']
      }
    },

    downloadSingleTranslation: {
      options: {
        poDir: 'po/',
        platformId: '22316',
        format: 'GNU_POT',
        tag: 'template.pot'
      }
    },

    ngconstant: {
      // Options for all targets
      options: {
        name: 'gem.config',
        dest: '<%= yeoman.app %>/scripts/config.js',
        wrap: 'export var gemConfigModule = {%= __ngModule %}',
        constants: {
          productName: 'MemberHive'
        }
      },
      server: {
        constants: {
          apiUrl: '<%= yeoman.api.development %>'
        }
      },
      dist: {
        constants: {
          apiUrl: '<%= yeoman.api.production %>'
        }
      }
    }
  });

  grunt.registerTask('restApiDocs', ['docular', 'docularserver']);

  grunt.loadNpmTasks('grunt-docular');
  // Load custom tasks from tasks/ directory
  grunt.loadTasks('grunt');
};
