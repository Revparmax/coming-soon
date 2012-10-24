
  require.config({

    //enforceDefine: true,

    baseUrl: '',

    deps: ['js/app'],

    shim: {
      'jquery': {
        exports: '$'
      },
      'handlebars': {
        exports: 'Handlebars'
      },
      'd3': {
        exports: 'd3'
      },
      'underscore': {
        exports: '_'
      },
      'backbone': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      }
    },

    paths: {

      // Support Libraries
      impress: 'components/impress.js/js/impress',
      d3: 'components/d3/d3.v2.min',
      backbone: 'components/backbone/backbone',
      underscore: 'components/underscore/underscore',
      jquery: 'components/jquery/jquery',
      text: 'components/text/text',
      handlebars: 'components/handlebars.js/handlebars-1.0.0-rc.1'

    }

  });