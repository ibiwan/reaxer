import { block, makeHook, makeSelector, writeFile } from "../../../util";

export const makeSliceHook = ({ selectors, actions }, featureName, storePrefix, { sliceName }) => {
    const hookName = makeHook(sliceName)

    writeFile(
        storePrefix,
        `${hookName}.js`,
        getContent(selectors, actions, featureName, sliceName, hookName)
    );

    return { hookName };
};

const getContent = (selectors, actions, featureName, sliceName, hookName) => {
    const sliceImports = getSliceImports(actions, selectors);
    const actionList = getActionList(actions);
    const selectorUses = getSelectorUseLines(selectors);
    const selectorList = getSelectorList(selectors);

    return block(`
        |import { bindActionCreators } from '@reduxjs/toolkit';
        |import { useDispatch, useSelector } from 'react-redux';
        |
        |import {
            ${sliceImports}
        |} from './${sliceName}';
        |
        |export const ${hookName} = () => {
        |    const dispatch = useDispatch();
        |
        |    const actions = bindActionCreators(
        |        {
            ${actionList}
        |        },
        |        dispatch
        |    );
        |
            ${selectorUses}
        |
        |    return {
        |        ...actions,
            ${selectorList}
        |    };
        |};
    `);
};

const getSliceImports = (actions, selectors) => {
    const actionImportLines = getActionImportLines(actions);
    const selectorImportLines = getSelectorImportLines(selectors);

    return `
        ${actionImportLines}
        ${selectorImportLines}
    `;
};

const getActionImportLines = (actions) => {
    if (!actions) {
        return '';
    }

    return actions.map(action => `
        |    ${action},
    `).join("");
};

const getSelectorImportLines = (selectors) => {
    if (!selectors) {
        return '';
    }

    return selectors.map(selector => `
        |    ${makeSelector(selector)},
    `).join("");
};

const getActionList = (actions) => {
    if (!actions) {
        return '';
    }

    return actions.map(action => `
        |            ${action}, 
    `).join('');
};

const getSelectorUseLines = (selectors) => {
    if (!selectors) {
        return '';
    }

    return selectors.map(selector => `
        |    const ${selector} = useSelector(${makeSelector(selector)});
    `).join('');
};

const getSelectorList = (selectors) => {
    if (!selectors) {
        return '';
    }

    return selectors.map(selector => `
        |        ${selector}, 
    `).join('');
};
