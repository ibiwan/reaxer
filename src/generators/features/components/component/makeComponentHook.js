import { block, writeFile, makeHook } from "../../../../util";

export const makeComponentHook = (componentPrefix, componentName) => {
    const hookName = makeHook(componentName)
    
    writeFile(
        componentPrefix,
        `${hookName}.js`,
        getContent(hookName)
    );

    return { hookName };
};

const getContent = hookName => {
    return block(`
        |export const ${hookName} = () => {
        |    return {};
        |};
    `);
};
