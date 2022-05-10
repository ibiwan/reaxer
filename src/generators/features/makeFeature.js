import { enterDir } from '../../util';
import { makeComponents } from './components/makeComponents';
import { makeFeatureIndex } from './makeFeatureIndex';
import { makeStore } from './store/makeStore';

export const makeFeature = (name, schema, featuresPrefix) => {
    const featurePrefix = enterDir(featuresPrefix, name);

    const { components, store } = schema;

    const componentNotes = makeComponents(components, featurePrefix);
    
    const storeNotes = makeStore(store, name, featurePrefix);

    makeFeatureIndex(featurePrefix, componentNotes, storeNotes);

    return {
        name,
        component: componentNotes,
        store: storeNotes,
    };
};
