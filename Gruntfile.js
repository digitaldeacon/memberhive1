// Generated on 2015-02-18 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var devServer = "https://localhost:3000/api";
  var prodServer = "https://localhost:3000/api";

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

    nggettext_extract: { // jshint ignore:line
      pot: {
        files: {
          'po/template.pot': ['<%= yeoman.app %>/**/*.html', '<%= yeoman.app %>/**/*.js']
        }
      }
    },

    nggettext_compile: { // jshint ignore:line
      all: {
        files: {
          '<%= yeoman.app %>/scripts/translations.js': ['po/**/*.po']
        }
      }
    },

    loopback_sdk_angular: { // jshint ignore:line
      services: {
        options: {
          input: 'server/server.js',
          output: '<%= yeoman.app %>/modules/core/services/lb-services.js',
          apiUrl: devServer

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

    'loopback_auto': {
      'db_autoupdate': {
        options: {

          method: 'autoupdate'
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      compass: {
        files: ['<%= yeoman.app %>/**/*.{scss,sass}'],
        tasks: ['compass:server']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      lbservices: {
        files: ['common/models/*'],
        tasks: ['lbservices']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '<%= yeoman.app %>/**/*.js',
          '.tmp/**/*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            return [
              connect.static(appConfig.app),
              connect.static('.tmp'),
              connect().use(
                '/jspm_packages',
                connect.static('./jspm_packages')
              )
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/**/*.js',
          'tasks/*.js',
          '!<%= yeoman.app %>/modules/core/services/lb-services.js',
          '!<%= yeoman.app %>/scripts/*.js',
          '!<%= yeoman.app %>/config.js'
        ]
      }
    },

    jscs: {
      src: '<%= yeoman.app %>/**/*.js',
      options: {
        config: '.jscsrc'
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
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },


    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/',
        cssDir: '.tmp/',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: './jspm_packages',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated',
          cssDir: appConfig.dist
        }
      },
      server: {
        options: {
          sourcemap: false
        }
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'templates/{,*/}*.html',
            '**/views/*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*',
            '*.js',
            '**/*.js',
            '*.html',
            '**/*.html',
            '*.crt',
            '*.key'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      dist: [
        'compass:dist',
      ]
    },

    githooks: {
      all: {
        'pre-commit': 'newer:jshint:all'
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {

    grunt.task.run([
      'githooks',
      'clean:server',
      'dbmigrate',
      'lbservices',
      'ngconstant:server',
      'nggettext_compile',
      'concurrent:server',
      'http2_server',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'lbservices',
    'ngconstant:server',
    'nggettext_compile',
    'concurrent:dist',
    'copy:dist',
    // TODO: `jspm bundle app dist/app.js`
  ]);

  grunt.registerTask('default', [
    'githooks',
    'dbmigrate',
    'build'
  ]);

  grunt.registerTask('updateWords', [
    'nggettext_extract',
    'extractModelTranslations',
    'uploadWords'
  ]);

  grunt.registerTask('updateTranslations', [
      'downloadTranslations',
      'nggettext_compile'
    ]);

  grunt.registerTask('dbmigrate', ['loopback_auto']);
  grunt.registerTask('lbservices', ['loopback_sdk_angular','loopback_angular_addModelData']);
  grunt.registerTask('restApiDocs', ['lbservices', 'docular', 'docularserver']);

  grunt.loadNpmTasks('grunt-angular-gettext');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-loopback-sdk-angular');
  grunt.loadNpmTasks('grunt-docular');
  grunt.loadNpmTasks('grunt-loopback-auto');
  grunt.loadNpmTasks('grunt-jscs');
  // Load custom tasks from tasks/ directory
  grunt.loadTasks('tasks');
};
