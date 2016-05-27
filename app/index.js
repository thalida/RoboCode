'use strict';

window.REQUIRE_UTILS = require('require-utils.js');

// Vendors
require('angular');

// Images
REQUIRE_UTILS.requireAll(require.context('./assets/images', false, /\.(svg|png|gif|jpg|jpeg)(\?]?.*)?$/));

// Styles
require('./app.scss');

// App Angular Module
require('./app.module.js');

// App Services, Components, and Views
require('./services');
require('./components');
require('./views');

// Bootstrap the angular app (if it hasn't been done already)
var isAppBootstrapped = angular.element(document.querySelectorAll('.app-container')).scope();
if( !isAppBootstrapped ){
    angular.bootstrap(document, ['app']);
}
