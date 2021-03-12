import { ApiClient } from "./HttpClient";

export class YoutubeAPI {
  private client: ApiClient;

  constructor(token: string) {
    this.client = new ApiClient({
      baseUrl: "https://www.googleapis.com/youtube/v3",
      token,
    });
  }

  async search(term: string) {
    return this.client.get(`/search?part=id,snippet&q=${term}&type=video`);
  }
}
