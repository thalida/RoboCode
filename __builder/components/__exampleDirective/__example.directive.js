'use strict';

var $requires = [];

var component = function(){
    return {
        restrict: 'E',
        templateUrl: require('./__example.html'),
        scope: {},
        bindToController: {},
        controllerAs: '__exampleCamelCase',
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
            var ctrl = this;
            ctrl.name = "__example";
        }]
    }
};

component.$inject = $requires;
module.exports = component;
