//  ng-controller="__exampleCamelCaseController as __exampleCamelCaseCtrl"
'use strict';

var requires = [
    '$stateProvider',
    '$urlRouterProvider'
]

var route = function( $stateProvider, $urlRouterProvider ){
    $stateProvider
        .state('__example', {
            url: '/__example',
            templateUrl: require('./__example.html'),
            controller: '__exampleCamelCaseController as __exampleCamelCaseView',
        });
};

route.$inject = $requires;
module.exports = route;
