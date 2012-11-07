/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: '<json:package.json>',

    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        '*/'
    },

    watch: {
      files: ['<config:lessFiles>'],
      tasks: 'less'
    },

    lessFiles: ['app/css/less/*.less'],
    // Build for less files
    less: {
      development: {
        options: {
          paths: ["app/css"]
        },
        files: {
          "app/css/index.css": ["app/css/bootstrap.less"]
        }
      }
    },

    requirejs: {
      compile: {
        options:{
          optimizeCss: 'none',
          optimize: 'none',
          baseUrl: './js',
          name: 'config',
          mainConfigFile: 'app/js/config.js',
          appDir: 'app',
          dir: 'dist'
        }
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {}
    },
    uglify: {}
  });

  // Less / yuidoc / requirejs
  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-reload');

  // Register default tasks
  grunt.registerTask('default', 'less requirejs');

  // Default task.
  //grunt.registerTask('default', 'lint qunit concat min');

};
