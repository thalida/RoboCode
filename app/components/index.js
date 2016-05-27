import { requireAll } from '../require-utils';
requireAll(require.context('./', true, /\.\/[\w\-\_]+\/index\.js$/));
