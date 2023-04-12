import { fileURLToPath, URL } from 'node:url'

function resolvePath(value) {
  return fileURLToPath(new URL(`${value}`, import.meta.url))
}

export { resolvePath }
