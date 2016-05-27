'use strict';

angular
.module('app', [
    require('angular-resource'),
    require('angular-touch'),
    require('angular-animate'),
    require('angular-sanitize'),
    require('angular-ui-router')
])
.config( require('./app.route.js') )
.run( require('./app.run.js') );
