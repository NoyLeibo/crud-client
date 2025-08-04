import Axios, { type Method } from "axios";

const BASE_URL: string =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000/";

const axios = Axios.create({
  withCredentials: true,
});

interface IHttpService {
  get(endpoint: string, data?: any): Promise<any>;
  post(endpoint: string, data?: any): Promise<any>;
  put(endpoint: string, data: any): Promise<any>;
  delete(endpoint: string, data?: any): Promise<any>;
}

export const httpService: IHttpService = {
  get(endpoint, data) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint, data) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint, data) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, "DELETE", data);
  },
};

async function ajax(
  endpoint: string,
  method: Method = "GET",
  data: any = null
): Promise<any> {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      params: method === "GET" ? data : undefined,
      data: method !== "GET" ? data : undefined,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err: any) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, message: `,
      err.message
    );
    const serverMessage =
      err.response.data?.message || "Unknown error from server";
    console.error("Server error:", serverMessage);
    throw new Error(serverMessage);
  }
}
