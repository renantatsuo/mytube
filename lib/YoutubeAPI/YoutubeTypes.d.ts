type YoutubeResource = {
  kind: "youtube#searchResult";
  etag: etag;
  id: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  };
  snippet: {
    publishedAt: datetime;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: integer;
        height: integer;
      };
    };
    channelTitle: string;
  };
};

type YoutubeSearchResult = {
  kind: "youtube#searchListResponse";
  etag: etag;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: integer;
    resultsPerPage: integer;
  };
  items: Array<YoutubeResource>;
};
