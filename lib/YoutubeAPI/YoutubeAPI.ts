import { ApiClient } from "#lib/HttpClient";

export class YoutubeAPI {
  private client: ApiClient;

  constructor(token: string) {
    this.client = new ApiClient({
      baseUrl: "https://www.googleapis.com/youtube/v3",
      token,
    });
  }

  async search(term: string): Promise<YoutubeSearchResponse> {
    return this.client.get(`/search?part=id,snippet&q=${term}&type=video`);
  }

  async getVideos(...videoIds: Array<string>): Promise<YoutubeVideoResponse> {
    return this.client.get(
      `/videos?part=id,statistics,snippet&id=${videoIds.join(",")}`
    );
  }
}
