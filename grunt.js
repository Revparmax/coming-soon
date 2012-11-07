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

    lessFiles: ['css/less/*.less'],
    // Build for less files
    less: {
      development: {
        options: {
          paths: ["css"]
        },
        files: {
          "css/index.css": ["css/bootstrap.less"]
        }
      }
    },

    requirejs: {
      compile: {
        options:{
          optimize: 'none',
          baseUrl: './js',
          name: 'config',
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
  grunt.registerTask('default', 'less');

  // Default task.
  //grunt.registerTask('default', 'lint qunit concat min');

};
