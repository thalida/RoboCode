export default {
    templateUrl: require('./__example-structure__.html'),
    bindings: {
        data: '<'
    },
    controller: class Controller {
        /*@ngInject*/
        constructor () {
            this.name = '__example-structure__';
        }
    }
}
