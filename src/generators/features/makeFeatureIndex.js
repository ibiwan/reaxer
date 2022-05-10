import { block, writeFile } from "../../util";

export const makeFeatureIndex = (featurePrefix, componentNotes, storeNotes) => {
    writeFile(
        featurePrefix,
        'index.js',
        getContent(componentNotes.length > 0, Object.keys(storeNotes).length > 0)
    );
};

const getContent = (hasComponents, hasStore) => {
    const componentsLine = hasComponents ? "|export * from './components'" : '';
    const storeLine = hasStore ? "|export * from './store'" : '';

    return block(`
        ${componentsLine}
        ${storeLine}
    `);
};
