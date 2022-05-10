import { block, writeFile } from "../../../../util";

export const makeComponentJsx = (componentPrefix, componentName, hookName) => {
    writeFile(
        componentPrefix,
        `${componentName}.jsx`,
        getContent(componentName, hookName)
    );

};

const getContent = (componentName, hookName) => {
    return block(`
        |import { ${hookName} } from './${hookName}';
        |
        |export const ${componentName} = () => {
        |    const {} = ${hookName}();
        |
        |    return (
        |        <div>${componentName}</div>
        |    );
        |};
    `);
};
