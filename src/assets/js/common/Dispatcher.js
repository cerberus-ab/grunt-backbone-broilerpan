/**
 * Base dispatcher class
 *
 * @module Dispatcher
 * @returns {constructor}
 */
define([
    'lodash',
    'backbone'

], function(
    _,
    Backbone

) {
    'use strict';

    function Dispatcher() {
        this._events = {};
    }
    _.extend(Dispatcher.prototype, Backbone.Events);

    return Dispatcher;

});