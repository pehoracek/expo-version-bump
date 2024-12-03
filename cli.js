#!/usr/bin/env node
import { updateExpoVersions } from './index.js';

const args = process.argv.slice(2);

// Determine version type and app.json path
const versionType = args
  .find((arg) => ['--major', '--minor', '--patch'].includes(arg))
  ?.replace('--', '');
const customAppJsonPath = args
  .find((arg) => arg.startsWith('--app-file='))
  ?.replace('--app-file=', '');

const options = {
  ...(versionType && { versionType }),
  ...(customAppJsonPath && {
    appJsonPath: path.resolve(process.cwd(), customAppJsonPath),
  }),
};

updateExpoVersions(options);
