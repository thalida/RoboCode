import angular from 'angular';

import './__example-structure__.scss';

import __ExampleStructure__ from './__example-structure__.component';

export default angular
    .module('__appName__-components.__exampleStructure__', [])
    .component('__exampleStructure__', __ExampleStructure__)
    .name;
