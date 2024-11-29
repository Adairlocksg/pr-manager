import { API_BASE_URL } from "@/api/api";
import axios from "axios";

export class AxiosService {
  public static setDefaultHeaders(token?: string) {
    axios.defaults.headers.common["userId"] = `${
      token ?? localStorage.getItem("@token")
    }`;
  }

  public static setBaseUrl() {
    axios.defaults.baseURL = API_BASE_URL;
  }
}
