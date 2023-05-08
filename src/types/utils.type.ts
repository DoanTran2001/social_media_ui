export interface ResponseApi<Data> {
  message: string,
  data?: Data
}

export type GradientType = {
  [key: string]: string[]
}