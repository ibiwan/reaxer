import { enterDir } from "../../../util";
import { makeSlice } from "./makeSlice";
import { makeSliceHook } from "./makeSliceHook";
import { makeStoreIndex } from "./makeStoreIndex";

export const makeStore = (store, featureName, featurePrefix) => {
    if (!store) { return []; }

    const storePrefix = enterDir(featurePrefix, 'store');

    const sliceNotes = makeSlice(store, featureName, storePrefix);
    const hookNotes = makeSliceHook(store, featureName, storePrefix, sliceNotes);
    makeStoreIndex(sliceNotes, hookNotes, featureName, storePrefix)

    return { sliceNotes, hookNotes };
};
