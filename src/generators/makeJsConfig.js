
import { block, writeFile } from "../util";

export const makeJsConfig = (appPrefix) => {
    writeFile(
        appPrefix,
        `jsconfig.json`,
        getContent()
    );

    return {};
};

const getContent = () => {
    return block(`
        |{
        |    "compilerOptions": {
        |        "baseUrl": "src"
        |    },
        |    "include": ["src"]
        |}
    `);
};
