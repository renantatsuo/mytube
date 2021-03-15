import { useAuth } from "#context/AuthContext";
import { YoutubeAPI } from "#lib/YoutubeAPI";
import { useAsync } from "./useAsync";

function useYoutube() {
  const {
    execute,
    data: searchResult,
    ...async
  } = useAsync<YoutubeSearchResult>();
  const { token } = useAuth();
  const youtubeAPI = new YoutubeAPI(token);

  async function search(searchTerm: string): Promise<void> {
    execute(youtubeAPI.search(searchTerm));
  }

  return {
    searchResult,
    search,
    videos: searchResult?.items,
    ...async,
  } as const;
}

export { useYoutube };
