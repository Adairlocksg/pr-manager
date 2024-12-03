import { ValidationError } from "@/types/Error";
import axios from "axios";

export class AxiosService {
  public static setDefaultHeaders(token?: string) {
    axios.defaults.headers.common["userId"] = `${
      token ?? localStorage.getItem("@token")
    }`;
  }

  public static setBaseUrl() {
    axios.defaults.baseURL = import.meta.env.VITE_BASE_URL.replace(/["']/g, "");
  }

  public static handleError(error: unknown): string {
    if (axios.isAxiosError<ValidationError>(error)) {
      const errorMeessage = error.response?.data.detail;

      return errorMeessage ?? "Ocorreu um erro não identificao;";
    }

    return "Ocorreu um erro não identificao";
  }
}
