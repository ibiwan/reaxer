import { enterDir } from '../../../util';
import { makeComponent } from './component/makeComponent';
import { makeComponentsIndex } from './makeComponentsIndex';

export const makeComponents = (components, featurePrefix) => {
    if (!components) { return []; }

    const componentsPrefix = enterDir(featurePrefix, 'components');

    const componentNotes = Object.entries(components).map(
        ([componentName, componentSchema]) =>
            makeComponent(componentName, componentSchema, componentsPrefix)
    );

    makeComponentsIndex(componentsPrefix, componentNotes)

    return componentNotes;
};
