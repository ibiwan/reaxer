import fs from 'fs';
import YAML from 'yaml';
import commandLineArgs from 'command-line-args';
import { makeApp } from './generators/makeApp';
import { enterDir, readFile, writeFile } from './util';

const optionDefinitions = [
    { name: 'schemaFile', alias: 's', type: String },
];

const args = commandLineArgs(optionDefinitions);
const { schemaFile } = args;
const schemaYml = readFile(schemaFile);
const schema = YAML.parse(schemaYml);

// const timestamp = new Date().toISOString();

fs.rmSync('output/', { recursive: true, force: true });

if(!fs.existsSync('output')){
    fs.mkdirSync('output')
}

// const outDirName = enterDir('output/', timestamp);
const outDirName = enterDir('output/', 'reuse');

writeFile(outDirName, 'schema.yml', schemaYml);

const notes = makeApp(schema, outDirName);

writeFile(outDirName, 'notes.json', JSON.stringify(notes,null, 3))
