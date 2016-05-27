import { requireAll } from './require-utils';
import angular from 'angular';
import './app.js';
import './app.scss';

// Bootstrap the angular app (if it hasn't been done already)
var isAppBootstrapped = angular.element(document.querySelectorAll('.app-container')).scope();
if( !isAppBootstrapped ){
    angular.bootstrap(document, ['app']);
}
