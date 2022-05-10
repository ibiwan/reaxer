import { enterDir, writeFile } from '../util';
import { makeFeature } from './features/makeFeature';
import { makeAppJsx } from './makeAppJsx';
import { makeAppMain } from './makeAppMain';
import { makeAppStore } from './makeAppStore';
import { makeJsConfig } from './makeJsConfig';
import { makeMainHtml } from './makeMainHtml';
import { makePackageJson } from './makePackageJson';

export const makeApp = (appSchema, fsPrefix) => {
    const appName = appSchema.name;

    const appPrefix = enterDir(fsPrefix, appName);

    writeFile(appPrefix, '.npmrc', 'registry=https://registry.npmjs.org/\n')

    makeJsConfig(appPrefix)

    makePackageJson(appName, appPrefix);

    const modulesDir = enterDir(appPrefix, 'node_modules');

    const publicDir = enterDir(appPrefix, 'public');

    makeMainHtml(appName, publicDir)

    const srcDir = enterDir(appPrefix, 'src');

    const featuresPrefix = enterDir(srcDir, 'features');

    const featureNotes = Object.entries(appSchema.features).map(
        ([featureName, featureSchema]) =>
            makeFeature(featureName, featureSchema, featuresPrefix)
    );

    const storeNotes = makeAppStore(featureNotes, srcDir);

    makeAppMain(srcDir);
    makeAppJsx(srcDir);

    return {
        featureNotes,
        storeNotes,
    }
};
