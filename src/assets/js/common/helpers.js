/**
 * Helpers library
 *
 * @module helpers
 * @returns {object}
 */
define([
    'lodash'

], function(
    _

) {
    'use strict';

    var helpers = {};

    /**
     * Simple replacer for template strings
     *
     * @function helpers.replacer
     * @param {string} text
     * @param {object} data
     * @returns {string}
     */
    helpers.replacer = function(text, data) {
        return _.reduce(data, function(result, value, key) {
            return result.replace(new RegExp('{\\s*' + key + '\\s*}', 'ig'), value);
        }, text);
    };

    return helpers;

});