# expo-version-bump

A simple utility to manage version and build numbers for Expo mobile applications.

## Installation

```bash
npm install -g expo-version-bump
# or
npm install --save-dev expo-version-bump
```

## Usage

### CLI Usage

```bash
# Increment build numbers (default behavior)
npx expo-version-bump

# Increment build numbers and patch version
npx expo-version-bump --patch

# Increment build numbers and minor version
npx expo-version-bump --minor

# Increment build numbers and major version
npx expo-version-bump --major

# Specify a custom app.json configuration file
npx expo-version-bump --patch --app-file=app-2.json
```

### Recommended NPM Scripts Setup

Add these scripts to your project's `package.json` for quick access:

```json
{
  "scripts": {
    "version:build": "expo-version-bump",
    "version:patch": "expo-version-bump --patch",
    "version:minor": "expo-version-bump --minor",
    "version:major": "expo-version-bump --major",
    
    "version:build:app2": "expo-version-bump --app-file=app-2.json",
    "version:patch:app2": "expo-version-bump --patch --app-file=app-2.json",
    "version:minor:app2": "expo-version-bump --minor --app-file=app-2.json"
  }
}
```

Then you can run these scripts with:

```bash
npm run version:build
npm run version:patch
npm run version:minor
```

## Features

- Increment iOS and Android build numbers
- Optional version bump (patch, minor, major)
- Supports custom app.json configuration file
- Configurable file paths
- Simple CLI

## License

MIT
