import { useAuth } from "#context/AuthContext";
import { YoutubeAPI } from "#lib/YoutubeAPI";
import { useAsync } from "./useAsync";

type SearchResult = YoutubeVideoResponse;

export function useYoutube() {
  const {
    execute,
    data: searchResult,
    isPending,
    ...async
  } = useAsync<SearchResult>();
  const { token } = useAuth();
  const youtubeAPI = new YoutubeAPI(token);

  async function search(searchTerm: string, options: any = {}): Promise<void> {
    if (isPending) {
      return;
    }

    const searchResult = await youtubeAPI.search(searchTerm);
    const videoIds = searchResult.items.map((item) => item.id.videoId);

    const videos = youtubeAPI.getVideos(...videoIds).then(({ items }) => ({
      ...searchResult,
      items,
    }));
    execute(videos);
  }

  return {
    search,
    searchContext: {
      searchResult,
      videos: searchResult?.items || [],
      isPending,
      ...async,
    },
  } as const;
}
