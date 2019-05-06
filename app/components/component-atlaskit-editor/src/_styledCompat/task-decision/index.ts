//
// This file is used in development with lerna to resolve types for the package (because they live
// in `src/`) *without* needing to use the `types` `package.json` field.
//
// We don't want to use the `types` field, as we want to point it to the declaration file in the
// published package.
//
// This file should be npm-ignored, so that it doesn't exist in the published package, and resolution
// falls through to the `types` and `main` `package.json` fields.
//
export * from './src';
