/**
 * Requirejs main config file for production
 *
 */
require.config({
    map: {
        '*': {
            'underscore': 'lodash'
        }
    }
});
