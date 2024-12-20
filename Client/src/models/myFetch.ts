const API_BASE_URL = 'https://fitnessapp-uay6.onrender.com'
const API_URL = 'http://fitnessapp-uay6.onrender.com/api/v1/'

export function rest<T>(
  url: string,
  data?: any,
  method?: string,
  headers?: Record<string, string>
): Promise<T> {
  return fetch(url, {
    method: method ?? (data ? 'POST' : 'GET'),
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: data ? JSON.stringify(data) : undefined
  }).then((x) => x.json())
}

export function api<T>(url: string, data?: any, method?: string): Promise<T> {
  return rest<T>(API_URL + url, data, method)
}
