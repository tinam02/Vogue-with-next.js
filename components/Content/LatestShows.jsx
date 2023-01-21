import { useQuery } from "@apollo/client";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useCallback, useRef } from "react";

import { GET_LATEST_SHOWS } from "../../queries";
import ShowCard from "../UI/ShowCard";
import Spinner from "../UI/Spinner";

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

  if (networkStatus === 1) return <Spinner />;
  if (error) return <p>GraphQL error</p>;
  if (!data) return null;
  return (
    <Container
      maxWidth="lg"
      sx={{
        mb: {
          xs: 7,
          sm: 2,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 1.5,
          mt: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontSize: "20px" }}>
          LATEST ADDITIONS
        </Typography>
      </Box>

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
                ref={lastShowRef}
                key={show.id}
              >
                <ShowCard
                  resizedUrl={show.photosTout?.resizedUrl}
                  altText={show.photosTout?.altText || "show"}
                  title={show.brand?.name}
                  channel={show.channels[0]?.name}
                  season={show.season?.name}
                  brand={show.brand?.name}
                  slug={show?.slug}
                />
              </Grid>
            );
          } else {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={show.id}>
                <ShowCard
                  resizedUrl={show.photosTout?.resizedUrl}
                  altText={show.photosTout?.altText || "show"}
                  title={show.brand?.name}
                  channel={show.channels[0]?.name}
                  season={show.season?.name}
                  brand={show.brand?.name}
                  slug={show?.slug}
                />
              </Grid>
            );
          }
        })}
      </Grid>
      {networkStatus === 3 && <Spinner />}
    </Container>
  );
};

export default LatestShows;
