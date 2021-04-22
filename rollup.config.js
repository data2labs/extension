import path from 'path'

const entrypoint = path.resolve('./src/extension.ts')
const outputDir = path.resolve('./build')
const outputEntrypoint = path.resolve(outputDir, 'extension.js')

export default {
  input: entrypoint,
  output: {
    file: outputEntrypoint,
    format: 'iife'
  }
}