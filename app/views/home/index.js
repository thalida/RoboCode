import angular from 'angular';
import uirouter from 'angular-ui-router';

import './home.scss';

import routing from './home.routes';
import Home from './home.controller';

export default angular
    .module('app.home', [uirouter])
    .config(routing)
    .controller('Home', Home)
    .name;
