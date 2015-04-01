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

  // Configurable paths for the application
  var appConfig = {
    app: 'app',
    dist: 'dist',
    api: {
      development: 'http://0.0.0.0:3000/api/',
      production: '/api/'
    }
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    nggettext_extract: { // jshint ignore:line
      pot: {
        files: {
          'po/template.pot': ['app/**/*.html', 'app/_global/tpl/*.html', 'app/**/*.js']
        }
      }
    },

    nggettext_compile: { // jshint ignore:line
      all: {
        files: {
          'app/_global/scripts/translations.js': ['po/**/*.po']
        }
      }
    },

    loopback_sdk_angular: { // jshint ignore:line
      services: {
        options: {
          input: 'server/server.js',
          output: 'app/_global/scripts/lb-services.js',
          apiUrl: 'http://localhost:3000/api'

        }
      }
    },

    loopback_angular_addModelData: { // jshint ignore:line
      services: {
        options: {
          modelConfig: 'server/model-config.json',
          serviceFile: 'app/_global/scripts/lb-services.js',
          modelDir: 'common/models/'
        }
      }
    },

    poAddLanguageHeaders: {
      options: {
        poDir: 'po/'
      }
    },

    'loopback_auto': {
      'db_autoupdate': {
        options: {
          dataSource: 'db',
          app: './server/server',
          config: './server/model-config',
          method: 'autoupdate'
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      compass: {
        files: ['<%= yeoman.app %>/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      translations: {
        files: ['po/**/*.po'],
        tasks: ['po2js']
      },
      babel: {
        files: ['<%= yeoman.app %>/**/*.es6.js'],
        tasks: ['newer:babel']
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
          '.tmp/scripts/styles/**/*.css',
          '.tmp/scripts/**/*.js',
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
              connect.static('.tmp'),
              connect().use(
                '/jspm_packages',
                connect.static('./jspm_packages')
              ),
              connect().use(
                '/app/_global/styles',
                connect.static('./app/_global/styles')
              ),
              connect.static(appConfig.app)
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
          'app/**/*.js',
          'tasks/*.js',
          '!app/_global/scripts/metronic/**/*.js',
          '!app/_global/scripts/lb-services.js',
          '!app/_global/scripts/translations.js',
          '!app/config.js'
        ]
      }
    },

    jscs: {
      src: 'app/**/*.js',
      options: {
        config: '.jscsrc'
      }
    },

    ngconstant: {
      // Options for all targets
      options: {
        name: 'gem.config',
        dest: '<%= yeoman.app %>/_global/scripts/config.es6.js',
        wrap: 'export var gemConfigModule = {%= __ngModule %}'
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

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    'babel': {
      options: {
        sourceMap: true,
        experimental: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['**/*.es6.js'],
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/_global/styles',
        cssDir: '.tmp/scripts/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/_global/images',
        javascriptsDir: '<%= yeoman.app %>/_global/scripts',
        fontsDir: '<%= yeoman.app %>/_global/styles/fonts',
        importPath: './jspm_packages',
        httpImagesPath: '/_global/images',
        httpGeneratedImagesPath: '/_global/images/generated',
        httpFontsPath: '/_global/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/_global/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: false
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/_global/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/_global/styles/{,*/}*.css',
          '<%= yeoman.dist %>/_global/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/_global/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/_global/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/_global/images',
          '<%= yeoman.dist %>/_global/styles'
        ]
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/_global/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/_global/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/_global/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/_global/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', '_global/views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
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
            '_global/tpl/{,*/}*.html',
            '**/views/*.html',
            '_global/images/{,*/}*.{webp}',
            '_global/styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/_global/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= yeoman.dist %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      'live': {
        expand: true,
        cwd: 'app/',
        dest: '.tmp/scripts',
        src: [
          '_global/scripts/lb-services.js',
          '_global/scripts/translations.js',
          '_global/scripts/metronic/**',
          'adf/**'
        ]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'babel',
        'compass:server'
      ],
      dist: [
        'babel:dist',
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    githooks: {
      all: {
        'pre-commit': 'newer:jshint:all'
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'githooks',
      'clean:server',
      'dbmigrate',
      'lbservices',
      'ngconstant:server',
      'po2js',
      'copy:live',
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'lbservices',
    'ngconstant:server',
    'po2js',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'githooks',
    'dbmigrate',
    'build'
  ]);

  grunt.registerTask('updatepot', [
    'nggettext_extract'
  ]);

  grunt.registerTask('po2js', [
      'poAddLanguageHeaders', // Add missing language headers
      'nggettext_compile'
    ]);

  grunt.registerTask('dbmigrate', ['loopback_auto']);
  grunt.registerTask('lbservices', ['loopback_sdk_angular', 'loopback_angular_addModelData']);

  grunt.loadNpmTasks('grunt-angular-gettext');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-loopback-sdk-angular');
  grunt.loadNpmTasks('grunt-loopback-auto');
  grunt.loadNpmTasks('grunt-jscs');

  // Load custom tasks from tasks/ directory
  grunt.loadTasks('tasks');
};
