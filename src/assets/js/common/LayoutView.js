/**
 * Base layout view class
 *
 * @module LayoutView
 * @returns {Backbone.View}
 */
define([
    'lodash',
    'backbone'

], function(
    _,
    Backbone

) {
    'use strict';

    /**
     * Base layout view class
     *
     * @constructor LayoutView
     */
    var LayoutView = Backbone.View.extend({

        /**
         * Render method
         *   do not override
         *
         * @method LayoutView.render
         * @returns {this}
         */
        render: function() {
            // before render callback
            this.beforeRender();

            // render view
            this.$el.html(this.template(this.serialize()));

            // after render callback
            this.afterRender();
            return this;
        },

        // overrides
        serialize: function() { return {}; },
        beforeRender: function() {},
        afterRender: function() {}

    });

    return LayoutView;
});