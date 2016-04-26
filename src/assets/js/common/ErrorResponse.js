/**
 * Error Response class
 *
 * @module ErrorResponse
 * @returns {constructor}
 */
define([], function() {
    'use strict';

    function ErrorResponse(jqXHR) {
        if (typeof jqXHR !== 'string') {
            this.status = jqXHR.status;
            this.message = jqXHR.statusText;
        }
        else {
            this.status = 500;
            this.message = jqXHR;
        }
    }

    ErrorResponse.prototype.toString = function() {
        return (this.status ? (this.status + ': ') : '') + this.message;
    };

    return ErrorResponse;
});