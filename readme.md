## eszip2go

A basic web server that renders the [eszip](https://github.com/denoland/eszip)
bundle of the requested module.

> [!IMPORTANT]\
> It's recommended that you specify `allowedHostnames` to prevent misuse.

```ts
import { createServer } from 'https://deno.land/x/eszip2go@v0.1.0/mod.ts'

createServer()
```

### Customization

- `allowedExtensions`

  A regular expression for the allowed file extensions. Defaults to
  `/^json|wasm|js|mjs|ts|mts$/`.

- `mustHaveExtension`

  Whether the requested module should have an extension. By default this option
  is set to `false`.

- `allowedHostnames`

  A regular expression or an array of strings for the allowed hostnames.

- `disallowedHostnames`

  A regular expression or an array of strings for the disallowed hostnames.

### Usage

1. First start your own instance of eszip2go, optionally with a custom hostname
   and port.
2. Then, for example, we want to retrieve the eszip bundle of the standard
   encoding library. You would pass the entire URL without the protocol part
   (`https://`) as the path to it as follows:

   ```
   http://localhost/deno.land/std@0.219.0/encoding/mod.ts
   ```
3. This produces a response with the eszip bundle. The file name specified in
   the `content-disposition` header corresponds to the hex-encoded path that you
   entered in the step above.

> [!NOTE]\
> eszip2go sets a `cache-control` header in every circumstance, but the
> `max-age` differs depending on whether an error occurred or not. If everything
> went ok, it is set to 7 days, otherwise it is set to 30 minutes to prevent
> abuse.
