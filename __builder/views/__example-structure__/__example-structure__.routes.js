/*@ngInject*/
export default function routes( $stateProvider, $urlRouterProvider ){
    $stateProvider
        .state('__app-name__.__example-structure__', {
            url: '/__example-structure__',
            template: require('./__example-structure__.html'),
            controller: '__ExampleStructure__',
            controllerAs: '__exampleStructure__'
        });
};
