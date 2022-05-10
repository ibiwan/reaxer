import fs from 'fs';

export const readFile = name => fs.readFileSync(name).toString();

export const enterDir = (prefix, suffix) => {
    const newDir = `${prefix}${suffix}/`;

    fs.mkdirSync(newDir);

    return newDir;
};

export const writeFile = (prefix, name, content) => {
    const file = `${prefix}${name}`;

    fs.writeFileSync(
        file,
        content
    );

    return file;
};

export const printTrace = (msg) => {
    try {
        throw new Error();
    } catch (e) {
        console.log({ e });
    }
};

export const block = (mStr, marker = '|') =>
    mStr.split("\n")
        .map(s => s.trim())
        // .map(tee((c, i) => console.log(i, c)))
        .filter(a => a)
        .map(s =>
            s.includes(marker) ?
                s.split(marker).slice(1) :
                s
        )
        .join("\n");

const tee = f => (cur, i, arr) => { f(cur, i, arr); return cur; };

const capitalize = s => s.substr(0, 1).toUpperCase() + s.substr(1);

export const makeSelector = s => s.startsWith('selector') ?
    s :
    `select${capitalize(s)}`;

export const makeHook = s => s.startsWith('use') ?
    s :
    `use${capitalize(s)}`;

export const makeReducer = s => s.endsWith('Reducer') ?
    s :
    `${s}Reducer`;
