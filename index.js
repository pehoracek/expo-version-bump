#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

/**
 * Increments a semantic version string
 * @param {string} currentVersion - Current version in semantic versioning format
 * @param {string} [type='patch'] - Type of version increment (patch, minor, major)
 * @returns {string} New incremented version
 */
export function incrementVersion(currentVersion, type = 'patch') {
  const parts = currentVersion.split('.').map(Number);

  switch (type) {
    case 'major':
      parts[0]++;
      parts[1] = 0;
      parts[2] = 0;
      break;
    case 'minor':
      parts[1]++;
      parts[2] = 0;
      break;
    case 'patch':
    default:
      parts[2]++;
  }

  return parts.join('.');
}

/**
 * Updates version and build numbers for Expo app
 * @param {Object} options - Configuration options
 * @param {string} [options.versionType] - Type of version increment (major, minor, patch)
 * @param {string} [options.appJsonPath='app.json'] - Path to app.json
 * @param {string} [options.packageJsonPath='package.json'] - Path to package.json
 */
export function updateExpoVersions(options = {}) {
  const {
    versionType,
    appJsonPath = path.resolve(process.cwd(), 'app.json'),
    packageJsonPath = path.resolve(process.cwd(), 'package.json'),
  } = options;

  // Read existing configurations
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Increment build numbers
  const currentIosBuildNumber = appJson.expo.ios.buildNumber;
  const currentAndroidBuildCode = appJson.expo.android.versionCode;

  const newIosBuildNumber = (parseInt(currentIosBuildNumber) + 1).toString();
  const newAndroidBuildCode = currentAndroidBuildCode + 1;

  // Update build numbers in app.json
  appJson.expo.ios.buildNumber = newIosBuildNumber;
  appJson.expo.android.versionCode = newAndroidBuildCode;

  // Version update
  if (versionType) {
    const currentVersion = packageJson.version;
    const newVersion = incrementVersion(currentVersion, versionType);

    // Update package.json
    packageJson.version = newVersion;

    // Update app.json expo version
    appJson.expo.version = newVersion;

    console.log(`🆙 Updating app version to: ${newVersion}`);
  }

  // Write updated configurations
  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log(`🔢 Updated iOS build number to: ${newIosBuildNumber}`);
  console.log(`🤖 Updated Android build code to: ${newAndroidBuildCode}`);
}
