'use strict';

module.exports = {
    templateUrl: require('./__example.html'),
    bindings: {},
    controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
        var ctrl = this;
        ctrl.name = "__example";
    }]
};
