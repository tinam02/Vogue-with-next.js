import { useCallback, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_LATEST_SHOWS } from "../../queries";
import { Box, Button } from "@mui/material";


const LatestShows = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_LATEST_SHOWS, {
    variables: { after: "" },
  });

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  if (!data) return null;

  return (
    <>
      <Box sx={{ backgroundColor: "red" }}>
        {data.allContent.Content.map((show, i) => {
          if (data.allContent.Content.length == i + 1) {
            return (
              <Box
                key={show.id}
                ref={lastShowRef}
                sx={{ backgroundColor: "red", m: 0 }}
              >
                {show.title}
              </Box>
            );
          } else {
            return (
              <Box
                key={show.id}
                sx={{ height: 300, backgroundColor: "skyblue", m: 0 }}
              >
                {show.title}
              </Box>
            );
          }
        })}

        <Button onClick={handleLoadMore}>Load More</Button>
      </Box>
    </>
  );
};

export default LatestShows;
