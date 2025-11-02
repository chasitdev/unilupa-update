export interface Response<T> {
  data: T | null;
  success: boolean;
  statusCode: number;
  errorMessage?: string;
}
