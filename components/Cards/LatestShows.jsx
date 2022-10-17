import { useCallback, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_LATEST_SHOWS } from "../../queries";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ShowCard from "./ShowCard";

const LatestShows = () => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_LATEST_SHOWS,
    {
      variables: { after: "" },
      notifyOnNetworkStatusChange: true, //ovo vraca loading state (ili network status 3) da se key ne bi ponavljao!! bez ovoga je loading uvek false
    }
  );

  const handleLoadMore = useCallback(() => {
    if (!data) return;
    if (!data.allContent.pageInfo.hasNextPage) return;
    fetchMore({
      variables: {
        after: data.allContent.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          allContent: {
            ...fetchMoreResult.allContent,
            Content: [
              ...prev.allContent.Content,
              ...fetchMoreResult.allContent.Content,
            ],
          },
        };
      },
    });
  }, [data, fetchMore]);

  //inf scroll
  const observer = useRef(null);
  const lastShowRef = useCallback(
    (node) => {
      if (loading) return;
      if (!data) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.allContent.pageInfo.hasNextPage) {
          handleLoadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [data, handleLoadMore, loading]
  );

  if (error) return <p>Error...</p>;
  if (!data) return null;
  console.log(data);
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {data.allContent.Content.map((show, i) => {
          if (data.allContent.Content.length == i + 1) {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={show.id}
                ref={lastShowRef}
              >
                <ShowCard
                  resizedUrl={show.photosTout.resizedUrl}
                  altText={show.photosTout.altText}
                  title={show.brand.name}
                  channel={show.channels[0]?.name}
                  season={show.season.name}
                  brand={show.brand.name}
                />
                {show.id}
              </Grid>
            );
          } else {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={show.id}>
                <ShowCard
                  resizedUrl={show.photosTout.resizedUrl}
                  altText={show.photosTout.altText}
                  title={show.brand.name}
                  channel={show.channels[0]?.name}
                  season={show.season.name}
                  brand={show.brand.name}
                />{" "}
                {show.id}
              </Grid>
            );
          }
        })}
      </Grid>
    </Container>
  );
};

export default LatestShows;
