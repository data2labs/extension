import path from 'path';
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';

const entrypoint = path.resolve(__dirname, './src/extension.ts');
const manifestPath = path.resolve(__dirname, './manifest.json');
const iconPaths = {
  48: path.resolve(__dirname, './src/icons/48.png'),
  96: path.resolve(__dirname, './src/icons/96.png'),
};

const outputDir = path.resolve(__dirname, './build');
const outputManifestPath = path.resolve(outputDir, './manifest.json');
const outputEntrypoint = path.resolve(outputDir, './extension.js');
const outputIconPaths = {
  48: path.resolve(outputDir, './icons/48.png'),
  96: path.resolve(outputDir, './icons/96.png'),
};

const REPLACE_ENTRYPOINT_LABEL = 'BUILD_REPLACE_MANIFEST_ENTRYPOINT';
const REPLACE_48_ICON_LABEL = 'BUILD_REPLACE_MANIFEST_ICON_48';
const REPLACE_96_ICON_LABEL = 'BUILD_REPLACE_MANIFEST_ICON_96';

console.log(manifestPath, outputManifestPath)

export default {
  input: entrypoint,
  output: {
    file: outputEntrypoint,
    format: 'iife',
  },
  plugins: [
    copy({
      targets: [
        { src: manifestPath, dest: outputManifestPath },
        { src: iconPaths[48], dest: outputIconPaths[48] },
        { src: iconPaths[96], dest: outputIconPaths[96] },
      ],
    }),
    replace({
      preventAssignment: true,
      [REPLACE_ENTRYPOINT_LABEL]: path.resolve(
        outputManifestPath,
        outputEntrypoint
      ),
      [REPLACE_48_ICON_LABEL]: path.resolve(
        outputManifestPath,
        outputIconPaths[48]
      ),
      [REPLACE_96_ICON_LABEL]: path.resolve(
        outputManifestPath,
        outputIconPaths[96]
      ),
    }),
  ],
};
