// `http://localhost/example.com/foo/bar` -> `http://example.com/foo/bar`
export function convertUrl(str: string): string {
  const url = new URL(str)
  const arr = url.pathname.split('/')

  url.hostname = arr[1]
  url.pathname = arr.slice(2).join('/')

  return url.toString()
}
