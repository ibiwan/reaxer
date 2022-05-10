import { block, writeFile } from "../util";

export const makeMainHtml = (appName, publicPrefix) => {
    writeFile(
        publicPrefix,
        `index.html`,
        getContent(appName)
    );

    return {};
};

const getContent = (appName) => {
    return block(`
        |<!DOCTYPE html>
        |<html lang="en">
        |<head>
        |    <meta charset="utf-8" />
        |    <meta name="viewport" content="width=device-width, initial-scale=1" />
        |    <meta
        |        name="description"
        |        content="Web site created using create-react-app"
        |    />
        |    <title>${appName}</title>
        |</head>
        |<body>
        |    <noscript>You need to enable JavaScript to run this app.</noscript>
        |    <div id="root"></div>
        |</body>
        |</html>
    `);
};
