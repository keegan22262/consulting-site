export function success<T>(data: T, status = 200) {
  return Response.json(
    { success: true, data },
    { status }
  )
}

export function error(
  message: string,
  status = 500
) {
  return Response.json(
    { success: false, error: message },
    { status }
  )
}
