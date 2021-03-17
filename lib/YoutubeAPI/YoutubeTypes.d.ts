type YoutubeResponse<T> = {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Array<T>;
};

type YoutubeSearchResponse = YoutubeResponse<YoutubeSearchResource> & {
  kind: "youtube#searchListResponse";
};

type YoutubeSearchResource = {
  kind: "youtube#searchResult";
  etag: string;
  id: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  };
};

type YoutubeVideoResponse = YoutubeResponse<YoutubeVideoResource> & {
  kind: "youtube#searchListResponse";
};

type YoutubeVideoResource = {
  kind: "youtube#video";
  etag: string;
  id: string;
  snippet: {
    publishedAt: datetime;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    tags: Array<string>;
    categoryId: string;
  };
  statistics: {
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
    favoriteCount: number;
    commentCount: number;
  };
};
