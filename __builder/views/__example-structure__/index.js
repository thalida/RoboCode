import angular from 'angular';
import uirouter from 'angular-ui-router';

import './__example-structure__.scss';

import routing from './__example-structure__.routes';
import __ExampleStructure__ from './__example-structure__.controller';

export default angular
    .module('__appName__.__exampleStructure__', [uirouter])
    .config(routing)
    .controller('__ExampleStructure__', __ExampleStructure__)
    .name;
