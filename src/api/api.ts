import axios, { AxiosRequestConfig } from "axios";

export const API_BASE_URL = "http://192.168.2.188/PullRequestHub/";

type Reponse<T> = {
  data: T;
};

export class Api {
  public static async get<T, TResponse>(
    url: string,
    config?: AxiosRequestConfig<any>
  ): Promise<TResponse> {
    const { data } = await axios.get<T, Reponse<TResponse>>(url, config);
    return data;
  }

  public static async post<T, TResponse>(
    url: string,
    body: T,
    config?: AxiosRequestConfig<any>
  ): Promise<TResponse> {
    const { data } = await axios.post<T, Reponse<TResponse>>(url, body, config);
    return data;
  }

  public static async put<T, TResponse>(
    url: string,
    body: T,
    config?: AxiosRequestConfig<any>
  ): Promise<TResponse> {
    const { data } = await axios.put<T, Reponse<TResponse>>(url, body, config);
    return data;
  }

  public static async delete<T, TResponse>(
    url: string,
    config?: AxiosRequestConfig<any>
  ): Promise<TResponse> {
    const { data } = await axios.delete<T, Reponse<TResponse>>(url, config);
    return data;
  }
}
