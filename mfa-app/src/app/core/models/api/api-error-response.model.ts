export interface IApiErrorResponse {
  message: string;
  errors?: IApiFieldError[]
}

export interface IApiFieldError {
  fieldName: string;
  message: string;
}