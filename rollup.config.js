import path from 'path';
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';

const entrypoint = path.resolve(__dirname, './src/extension.ts');
const manifestPath = path.resolve(__dirname, './manifest.json');
const iconDir = path.resolve(__dirname, './icons')

const outputDir = path.resolve(__dirname, './build');
const outputManifestPath = path.resolve(outputDir, './manifest.json');
const outputEntrypoint = path.resolve(outputDir, './extension.js');
const outputIconDir = path.resolve(outputDir, './icons')

const REPLACE_ENTRYPOINT_LABEL = '{{BUILD_REPLACE_MANIFEST_ENTRYPOINT}}';
const REPLACE_ICON_DIR_LABEL = '{{BUILD_REPLACE_MANIFEST_ICON_DIR}}';

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
        { src: manifestPath, dest: outputDir },
        { src: iconDir, dest: outputDir },
      ],
    }),
    replace({
      preventAssignment: true,
      values: {
        [REPLACE_ENTRYPOINT_LABEL]: path.resolve(
          outputManifestPath,
          outputEntrypoint
        ),
        [REPLACE_ICON_DIR_LABEL]: path.resolve(
          outputManifestPath,
          outputIconDir
        ),
      }
    }),
  ],
};
