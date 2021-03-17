import { formatDate, formatNumber } from "#lib/FormatUtils";
import styled from "@emotion/native";
import React from "react";

type YoutubeSnippetProps = {
  video: YoutubeVideoResource;
};

export default function YoutubeSnippet({ video }: YoutubeSnippetProps) {
  const image = video.snippet.thumbnails.high;
  return (
    <SnippetCard>
      <Thumbnail
        source={{
          uri: image?.url,
        }}
      />
      <Title>{video.snippet.title}</Title>
      <Details>
        <DetailsText>
          {formatNumber(video.statistics.viewCount)} views
        </DetailsText>
        <DetailsText>{formatDate(video.snippet.publishedAt)}</DetailsText>
      </Details>
    </SnippetCard>
  );
}

const SnippetCard = styled.View({ marginBottom: 28 });

const Thumbnail = styled.Image({
  height: 200,
  borderRadius: 24,
  overflow: "hidden",
});

const Title = styled.Text({
  color: "#f8f8f2",
  marginTop: 8,
  paddingHorizontal: 12,
  fontSize: 16,
  fontWeight: "500",
});

const Details = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 12,
  paddingVertical: 8,
});

const DetailsText = styled.Text({
  color: "#AC9CB4",
  fontSize: 12,
});
