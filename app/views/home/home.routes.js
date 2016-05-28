/*@ngInject*/
export default function routes( $stateProvider, $urlRouterProvider ){
    $stateProvider
        .state('app.home', {
            url: '',
            template: require('./home.html'),
            controller: 'Home',
            controllerAs: 'home'
        });
};
