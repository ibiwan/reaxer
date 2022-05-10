import { block, writeFile } from "../util";

export const makeAppJsx = (srcPrefix) => {
    writeFile(
        srcPrefix,
        `App.jsx`,
        getContent()
    );

    return {};
};

const getContent = () => {
    return block(`
        |import React from 'react';
        |import { Provider } from 'react-redux';
        |
        |import { store } from './store';
        |
        |export const App = () => {
        |    return (
        |        <Provider store={store}>
        |            <MyRootComponent />
        |        </Provider>
        |    );
        |};
        |
        |export default App;
    `);
};
