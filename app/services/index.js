import { requireAll } from '../require-utils';

let services = requireAll(require.context('./', true, /\.\/[\w\-\_]+\/index\.js$/)).map(function( module ){
    return module.default;
});

export default services;
