import { requireAll } from '../require-utils';

let modules = requireAll(require.context('./', true, /\.\/[\w\-\_]+\/index\.js$/));
modules = modules.map(function( module ){
    return module.default;
});

export default modules;

