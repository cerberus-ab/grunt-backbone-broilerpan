/**
 * Main app class
 *
 * @module App
 * @returns {constructor}
 */
define([
    'jquery',
    './common/Dispatcher',
    './AppView'

], function(
    $,
    Dispatcher,
    AppView

) {
    'use strict';

    var instance = null;

    function AppSingleton() {
        if (instance) {
            return instance;
        }
        if (this && this.constructor === AppSingleton) {
            instance = this;
            this._initialize();
            this._attachEvents();

        } else {
            return new AppSingleton;
        }
    }

    AppSingleton.prototype._initialize = function() {
        this.dispatcher = new Dispatcher;

        // app view
        this.view = new AppView({
            dispatcher: this.dispatcher,
            el: $('.app')
        });

    };

    AppSingleton.prototype._attachEvents = function() {
        // attach app events
    };

    AppSingleton.prototype.start = function() {
        // start app
    };

    return AppSingleton;

});