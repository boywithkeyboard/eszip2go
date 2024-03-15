import { createRequestHandler } from './createRequestHandler.ts'

export type ServerOptions = {
  /**
   * By default, this setting will only allow serving of files ending in `.json`, `.wasm`, `.js`, `.mjs`, `.ts` and `.mts`.
   */
  allowedExtensions?: RegExp | string[]
  mustHaveExtension?: boolean
  allowedHostnames?: RegExp | string[]
  disallowedHostnames?: RegExp | string[]
  hostname?: string
  port?: number
}

export function createServer(options: ServerOptions = {}) {
  return Deno.serve({
    hostname: options.hostname ?? '0.0.0.0',
    port: options.port ?? 8080,
  }, createRequestHandler(options))
    .finished
}
