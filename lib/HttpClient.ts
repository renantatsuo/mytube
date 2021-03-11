type HttpClientRequestOptions = {
  method?: "get" | "post" | "put" | "patch" | "delete";
  headers?: { [key: string]: string };
};

type ApiClientConfig = {
  baseUrl?: string;
  token: string;
};

export class ApiClient {
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = config;
  }

  async get(endpoint: string, options: HttpClientRequestOptions = {}) {
    return get(`${this.config.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...options?.headers,
        authorization: `Bearer ${this.config.token}`,
      },
    });
  }
}

async function request(
  url: string,
  options: HttpClientRequestOptions = {}
): Promise<string> {
  return fetch(url, options as RequestInit).then((response) => {
    const { status, statusText } = response;
    if (status >= 400) {
      throw new Error(
        `Request failed with status code ${status} - ${statusText}`
      );
    }

    return response.text();
  });
}

async function get(
  url: string,
  options: HttpClientRequestOptions = {}
): Promise<string> {
  return request(url, { ...options, method: "get" });
}

export default {
  request,
  get,
};
