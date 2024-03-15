export function respondWithError(message: string, statusCode = 400) {
  return new Response(message, {
    status: statusCode,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'max-age=1800', // 30 minutes
    },
  })
}
