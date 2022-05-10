import { block, makeReducer, writeFile } from "../util";

export const makeAppStore = (featureNotes, srcPrefix) => {
    const features = featureNotes
        .filter(({ store }) => Object.keys(store).length > 0)
        .map(({ name }) => name);

    writeFile(
        srcPrefix,
        `store.js`,
        getContent(features)
    );

    return {};
};

const getContent = (features) => {
    const imports = getImports(features);
    const slices = getSlices(features);

    return block(`
        |import { configureStore } from '@reduxjs/toolkit';
        |
            ${imports}
        |
        |export const store = configureStore({
        |    reducer: {
                ${slices}
        |    },
        |});
    `);
};

const getImports = (features) => features.map(feature => `
        |import { ${makeReducer(feature)} } from 'features/${feature}';
    `).join('');

const getSlices = (features) => features.map(feature => `
        |       ${feature}: ${makeReducer(feature)},
    `).join('');


/*

export const store = configureStore({
  reducer: {
    canister: canisterReducer,
    controlPanel: controlPanelReducer,
    explosion: explosionReducer,
    game: gameReducer,
    geometry: geometryReducer,
    reactor: reactorReducer,
  },
});
*/
