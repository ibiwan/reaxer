import { enterDir } from '../../../../util';
import { makeComponentHook } from './makeComponentHook';
import { makeComponentIndex } from './makeComponentIndex';
import { makeComponentJsx } from './makeComponentJsx';

export const makeComponent = (name, schema, componentsPrefix) => {
    const componentName = schema;

    const componentPrefix = enterDir(componentsPrefix, name);

    const { hookName } = makeComponentHook(componentPrefix, componentName);
    makeComponentIndex(componentPrefix, componentName);
    makeComponentJsx(componentPrefix, componentName, hookName);

    return {
        componentDir: name,
    };
};
