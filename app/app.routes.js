route.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider'
];

export default function route ( $stateProvider, $urlRouterProvider, $locationProvider ){
    $locationProvider.html5Mode( MODE.production === true );

    $stateProvider.state('app', {url: '/', abstract: true, template: '<ui-view/>'} );

    $urlRouterProvider
        .otherwise('/')
        .rule(function( $injector, $location ){
            var path = $location.path()
            var hasTrailingSlash = path[path.length - 1] === '/';

            if( !hasTrailingSlash ){
                return path += '/'
            }
        });
};
