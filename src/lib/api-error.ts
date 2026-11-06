/** Read `{ error, code }` from a failed API response, with a fallback message. */
export async function readApiError(res: Response, fallback: string) {
  try {
    const data = await res.json();
    if (typeof data?.error === "string") {
      return { message: data.error as string, code: data.code as string | undefined };
    }
  } catch {
    // non-JSON body
  }
  return { message: fallback, code: undefined };
}
