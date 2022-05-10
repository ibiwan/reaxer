import { block, writeFile } from "../util";

export const makePackageJson = (appName, srcPrefix) => {
    writeFile(
        srcPrefix,
        `package.json`,
        getContent(appName)
    );

    return {};
};

const getContent = (appName) => {
    return block(`
        |{
        |    "name": "${appName}",
        |    "version": "0.1.0",
        |    "private": true,
        |    "dependencies": {
        |      "@reduxjs/toolkit": "^1.5.1",
        |      "@testing-library/jest-dom": "^4.2.4",
        |      "@testing-library/react": "^9.3.2",
        |      "@testing-library/user-event": "^7.1.2",
        |      "react": "^17.0.2",
        |      "react-dom": "^17.0.2",
        |      "react-redux": "^7.2.3",
        |      "react-scripts": "4.0.3"
        |    },
        |    "scripts": {
        |      "start": "react-scripts start",
        |      "build": "react-scripts build",
        |      "test": "react-scripts test",
        |      "eject": "react-scripts eject"
        |    },
        |    "eslintConfig": {
        |      "extends": "react-app"
        |    },
        |    "browserslist": {
        |      "production": [
        |        ">0.2%",
        |        "not dead",
        |        "not op_mini all"
        |      ],
        |      "development": [
        |        "last 1 chrome version",
        |        "last 1 firefox version",
        |        "last 1 safari version"
        |      ]
        |    }
        |  }
    `);
};