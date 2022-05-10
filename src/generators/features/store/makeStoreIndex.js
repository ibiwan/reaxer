import { block, makeReducer, writeFile } from "../../../util";

export const makeStoreIndex = (sliceNotes, hookNotes, featureName, storePrefix) => {
    writeFile(
        storePrefix,
        'index.js',
        getContent(sliceNotes, hookNotes, featureName)
    );
};

const getContent = (sliceNotes, hookNotes, featureName) => {
    const reducerName = makeReducer(featureName);
    const { hookName } = hookNotes;
    const { sliceName } = sliceNotes;

    return block(`
        |export { default as ${reducerName} } from './${sliceName}';
        |export { ${hookName} } from './${hookName}';
    `);
};
