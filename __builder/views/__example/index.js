'use strict'

// =============================================================================
//
// __Example View
//
// -----------------------------------------------------------------------------

require('./__example.scss');

angular
    .module('{{appname}}')
    .config( require('./__example.route.js') )
    .controller('__exampleCamelCaseController', require('./__example.controller.js'));

