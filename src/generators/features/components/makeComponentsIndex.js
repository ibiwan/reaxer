import { block, writeFile } from "../../../util";

export const makeComponentsIndex = (componentsPrefix, componentNotes) => {
    const componentDirs = (componentNotes ?? []).flatMap(note => note.componentDir);

    writeFile(
        componentsPrefix,
        'index.js',
        getContent(componentDirs)
    );
};

const getContent = (componentDirs) => {
    const exportComponents = componentDirs.map(dir => `
        |export * from './${dir}';
    `).join('');

    return block(`
        ${exportComponents}
    `);
};
