export async function nativeFetch(
  endpoint: string,
  options?: RequestInit
): Promise<Response> {
  return fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    },
    ...options,
  });
}
