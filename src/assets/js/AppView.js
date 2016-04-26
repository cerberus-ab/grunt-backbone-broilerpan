/**
 * Application main view class
 *
 * @module AppView
 * @returns {Backbone.View}
 */
define([
    'jquery',
    'lodash',
    'backbone'

], function(
    $,
    _,
    Backbone

) {
    'use strict';

    var AppView = Backbone.View.extend({

        template: null,

        initialize: function(options) {
            _.bindAll(this,
                'eventBodyClick'
            );

            this.dispatcher = options.dispatcher;

            // body click event
            $('body').on('click', this.eventBodyClick);
        },

        eventBodyClick: function(e) {
            this.dispatcher.trigger('dom:body:click', e);
        }

    });

    return AppView;

});