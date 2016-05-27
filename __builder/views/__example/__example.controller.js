'use strict';

var $requires = [
	'$scope'
];

var controller = function( $scope ){
	var ctrl = this;
    ctrl.name = '__example';
};

controller.$inject = $requires;
module.exports = controller;
