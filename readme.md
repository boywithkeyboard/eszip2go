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
