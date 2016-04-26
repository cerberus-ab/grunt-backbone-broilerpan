/**
 * Requirejs main config file
 *
 */
require.config({
    baseUrl: 'js',
    paths: {
        'jquery': '../../../node_modules/jquery/dist/jquery',
        'lodash': '../../../node_modules/lodash/lodash',
        'backbone': '../../../node_modules/backbone/backbone',
        'spin': '../../../node_modules/spin/dist/spin',
        'text': '../../../node_modules/text/text',
        'moment': '../../../node_modules/moment/moment'
    },
    shim: {
        'lodash': {
            exports: '_'
        },
        'jquery': {
            exports: '$'
        },
        'spin': {
            exports: 'Spinner'
        },
        'backbone': {
            deps: ['jquery', 'lodash', 'text'],
            exports: 'Backbone'
        }
    },
    map: {
        '*': {
            'underscore': 'lodash'
        }
    }
});
