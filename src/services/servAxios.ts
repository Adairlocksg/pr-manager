import axios from "axios";

export class AxiosService {
  public static setDefaultHeaders(token?: string) {
    axios.defaults.headers.common["userId"] = `${
      token ?? localStorage.getItem("@token")
    }`;
  }

  public static setBaseUrl() {
    axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
  }
}
