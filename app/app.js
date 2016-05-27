import angular from 'angular';
import resource from 'angular-resource';
import animate from 'angular-animate';
import sanitize from 'angular-sanitize';
import uirouter from 'angular-ui-router';

import views from './views';
import routes from './app.routes';
import run from './app.run';

let dependencies = [
    resource,
    animate,
    sanitize,
    uirouter
].concat(views);

export default angular
    .module('app', dependencies)
    .config( routes )
    .run( run );
