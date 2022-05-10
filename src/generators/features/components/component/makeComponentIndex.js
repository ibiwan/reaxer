import { block, writeFile } from "../../../../util";

export const makeComponentIndex = (componentPrefix, componentName) => {
    writeFile(
        componentPrefix,
        'index.js',
        getContent(componentName)
    );
};

const getContent = componentName => {
    return block(`
        |export { ${componentName} } from './${componentName}';
    `);
};
