import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: new AxiosHeaders({
        "Content-Type": "application/json",
      }),
      timeout: 10000,
    });

    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;

        if (token) {
          if (!config.headers) {
            config.headers = new AxiosHeaders();
          }
          // Use AxiosHeaders set() method
          (config.headers as AxiosHeaders).set(
            "Authorization",
            `Bearer ${token}`
          );
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response) {
          console.error(
            "API Error:",
            error.response.status,
            error.response.data
          );
        } else {
          console.error("Network or server error", error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string) {
    return this.axiosInstance.get<T>(url).then((res) => res.data);
  }

  public async post<T>(url: string, data?: any) {
    return this.axiosInstance.post<T>(url, data).then((res) => res.data);
  }

  public async put<T>(url: string, data?: any) {
    return this.axiosInstance.put<T>(url, data).then((res) => res.data);
  }

  public async delete<T>(url: string, data?: any) {
    return this.axiosInstance.delete<T>(url, { data }).then((res) => res.data);
  }
}

export default new ApiService();
