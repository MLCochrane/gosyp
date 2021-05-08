type ResponseStatus = 'success' | 'failure' | 'error'

interface ResponseInterface {
  status: ResponseStatus;
  data: { [key: string]: unknown };
}
