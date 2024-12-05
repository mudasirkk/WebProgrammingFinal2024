export interface DataEnvelope<T> {
  data: T
  message?: string
  isSuccess: boolean
  token?: string
}

export interface DataListEnvelope<T> extends DataEnvelope<T[]> {
  data: T[]
  total: number
}
