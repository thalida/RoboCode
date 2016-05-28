/*@ngInject*/
export default function(){
    return {
        restrict: 'E',
        template: require('./__example-structure__.html'),
        scope: {},
        bindToController: {
            data: '<'
        },
        controllerAs: '$ctrl',
        controller: class Controller {
            /*@ngInject*/
            constructor() {
                this.name = '__example-structure__';
            }
        }
    }
};
