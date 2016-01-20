'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    server: 'scripts',
    public: 'public',
    app: '<%= yeoman.public %>/app',
    dist: '<%= yeoman.public %>/dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // not sure (remove?)
    pkg: grunt.file.readJSON('package.json'),

    // Project settings
    yeoman: appConfig,

    // Monitor files for changes so they can be compiled and included in App.
    watch: {
        sass: {
            files: '<%= yeoman.public %>/scss/{,*/}*.{scss,sass}',
            tasks: ['sass:dev']
        }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      server: {
        src: [
          '<%= yeoman.server %>{,*/}*.js'
        ]
      },
      client: {
        src: [
          '<%= yeoman.app %>/{,*/}*.js'
        ]
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
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.public %>/index.html'],
        ignorePath:  /\.\.\//
      }
    },

    // uglify (minimize) JS for deployment
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/mapper.min.js': [
            '.tmp/scripts/{,*/}*.js'
          ]
        }
      }
    },

    // concatonate all the JS for minimization
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: '.tmp/scripts/{,*/}*.js',
        dest: '<%= yeoman.dist %>/mapper.js',
      },
    },

    // use SASS to build the SCSS into CSS (gem install sass)
    sass : {
        dev: {
            options: {
                style: 'expanded',
                compass: false
            },
            files: {
                '<%= yeoman.public %>/styles/mapper.css': '<%= yeoman.public %>/scss/mapper.scss'
            }
        },
        dist: {
            options: {
                style: 'compressed',
                compass: false
            },
            files: {
                '<%= yeoman.public %>/styles/mapper.css': '<%= yeoman.public %>/scss/mapper.scss'
            }
        }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: ['*.js', '!oldieshim.js'],
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: []
      },
      concat: {
        expand: true,
        cwd: '<%= yeoman.app %>/',
        dest: '.tmp/scripts/',
        src: '{,*/}*.js'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      dist: [
        'copy:concat'
      ]
    },

    // Client test settings
    karma: {
      unit: {
        configFile: 'test/client/karma.client.config.js',
        singleRun: true
      }
    },

    // Server test settings
    jasmine_node: {
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec'
      },
      all: ['test/server/']
    },

    // run command line tasks
    run: {
        install: {
            cmd: 'npm',
            args: [
                'install'
            ]
        },
        start: {
            cmd: 'npm',
            args: [
                'start'
            ]
        }
    }

  });

  grunt.registerTask('start', [
    'run:start'
  ]);

  grunt.registerTask('test', [
    // 'clean:server',
    'jshint:server',
    'jshint:client',
    // 'connect:test',
    'karma',
    'jasmine_node:all'
  ]);

  grunt.registerTask('build', [
    'run:install',
    'wiredep',
    'sass:dev',
  ]);

  grunt.registerTask('dist', [
    'clean:dist',
    'concurrent:dist',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'uglify'
  ]);

  grunt.registerTask('default', [
    'test',
    'build',
    'start'
  ]);
};
