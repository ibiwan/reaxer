import { block, makeSelector, writeFile } from "../../../util";

export const makeSlice = ({ values, selectors, actions }, featureName, storePrefix) => {
    const sliceName = `${featureName}Slice`;

    writeFile(
        storePrefix,
        `${sliceName}.js`,
        getContent(values, selectors, actions, featureName, sliceName)
    );

    return {
        sliceName
    };
};

const getContent = (values, selectors, actions, featureName, sliceName) => {
    const init = getInitializer(values);
    const reducers = getReducers(actions);
    const actionExports = getActionExports(actions, sliceName);
    const selectorFuns = getSelectorFuns(selectors, featureName);

    return block(`
        |import { createSlice } from '@reduxjs/toolkit';
        |
        ${init}
        |
        |export const ${sliceName} = createSlice({
        |    name: '${featureName}',
        |    initialState,
                ${reducers}
        |});
        |
        ${actionExports}
        ${selectorFuns}
        |export default ${sliceName}.reducer;
    `);
};

const getInitializer = (values) => {
    const valRows = getInitValues(values);

    return `
        |const initialState = {
        ${valRows}
        |};`;
};

const getInitValues = (values) => {
    return Object.entries(values).map(
        ([k, v]) => formatValueRow(k, v)
    ).join("\n");
};

const formatValueRow = (name, init) => {
    const stringy = JSON.stringify(init, null, 4);
    const lines = stringy.split("\n");
    if (lines.length <= 1) {
        return `|    ${name}: ${stringy},`;
    }

    const indentyLines = lines.map(line => ` |        ${line}`);
    const indenty = "\n" + indentyLines.join("\n");
    return `|    ${name}: ${indenty},`;
};

const getReducers = (actions) => {
    if (!actions) {
        return '';
    }

    const actionLines = getReducerLines(actions);

    return `
        |    reducers: {
        ${actionLines}
        |    }
    `;
};

const getReducerLines = (actions) => {
    return actions.map(action => `
        |        ${action}: (stateSlice, action) => {
        |            stateSlice.someField = 'newVal';
        |        },
    `).join("");
};

const getActionExports = (actions, sliceName) => {
    if (!actions) {
        return '';
    }

    const actionList = actions.join(', ');
    return `
      |export const { ${actionList}  } = ${sliceName}.actions;
      |
    `;
};

const getSelectorFuns = (selectors, featureName) => {
    if (!selectors) {
        return '';
    }

    return selectors.map(selector => `
        |export const ${makeSelector(selector)} = ({ ${featureName}: { fieldName } }) => fieldName;
        `
    ).join("\n") + "|";
};
