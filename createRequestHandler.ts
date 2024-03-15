import { encodeHex } from 'https://deno.land/std@0.220.1/encoding/hex.ts'
import * as eszip from 'https://deno.land/x/eszip@v0.64.2/mod.ts'
import { convertUrl } from './convertUrl.ts'
import { ServerOptions } from './createServer.ts'
import { respondWithError } from './respondWithError.ts'

type RequestHandler = (request: Request) => Promise<Response>

export function createRequestHandler({
  allowedExtensions = /^json|wasm|js|mjs|ts|mts$/,
  mustHaveExtension = false,
  allowedHostnames,
  disallowedHostnames,
}: ServerOptions): RequestHandler {
  return async (request) => {
    const url = new URL(request.url)

    if (url.pathname.startsWith('/favicon')) {
      return respondWithError('BAD HOSTNAME')
    }

    if (allowedHostnames) {
      if (allowedHostnames instanceof RegExp) {
        if (!allowedHostnames.test(url.hostname)) {
          return respondWithError('BAD HOSTNAME')
        }
      } else {
        if (
          allowedHostnames.length > 0 &&
          allowedHostnames.indexOf(url.hostname) < 0
        ) {
          return respondWithError('BAD HOSTNAME')
        }
      }
    }

    if (disallowedHostnames) {
      if (disallowedHostnames instanceof RegExp) {
        if (disallowedHostnames.test(url.hostname)) {
          return respondWithError('BAD HOSTNAME')
        }
      } else {
        if (disallowedHostnames.indexOf(url.hostname) >= 0) {
          return respondWithError('BAD HOSTNAME')
        }
      }
    }

    const extension = url.pathname.split('.').pop()

    if (mustHaveExtension && !extension) {
      return respondWithError('BAD EXTENSION')
    }

    if (extension && allowedExtensions) {
      if (allowedExtensions instanceof RegExp) {
        if (!allowedExtensions.test(extension)) {
          return respondWithError('BAD EXTENSION')
        }
      } else {
        if (allowedExtensions.indexOf(extension) >= 0) {
          return respondWithError('BAD EXTENSION')
        }
      }
    }

    try {
      const eszipBuf = await eszip.build([convertUrl(request.url)])

      return new Response(eszipBuf, {
        headers: {
          'content-disposition': `attachment; filename="${
            encodeHex(url.pathname)
          }.eszip"`,
          'cache-control': 'max-age=604800', // 7 days
        },
      })
    } catch (_err) {
      return respondWithError('BUILD FAILED', 500)
    }
  }
}
