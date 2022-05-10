import { block, writeFile } from "../util";

export const makeAppMain = (srcPrefix) => {
    writeFile(
        srcPrefix,
        `index.js`,
        getContent()
    );

    return {};
};

const getContent = () => {
    return block(`
        |import React from 'react';
        |import ReactDOM from 'react-dom';
        |
        |import App from './App';
        |
        |ReactDOM.render(
        |    <React.StrictMode>
        |        <App />
        |    </React.StrictMode>,
        |    document.getElementById('root')
        |);
    `);
};
