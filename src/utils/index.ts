import { AxiosError } from "axios";

interface ErrorResponse {
  status: number;
  error: {
    status: number;
    isOperational: boolean;
  };
  message: string;
  stack?: string;
}

export const getErrorMessage = (error: AxiosError): string => {
  console.log(error);
  if (error.response) {
    const { data } = error.response as { data: ErrorResponse };
    return data.message || "An unexpected error occurred.";
  }
  return "Network error, please try again later.";
};
