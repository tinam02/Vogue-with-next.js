import { useCallback, useContext, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_ARTICLES, GET_CONTENT } from "../../queries";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import Image from "mui-image";
import Masonry from "@mui/lab/Masonry";
import ArticleCard from "../UI/ArticleCard";
import { FBContext } from "../../context/FBContext";

const LatestArticles = () => {
  const { favArticles, addFavArticle } = useContext(FBContext);
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_ARTICLES,
    {
      variables: {
        after: "MjAyMi0xMC0xN1QyMToxMDowNGlkNjM0OWUxNDRhNGMzYzJmODc2MjY2ZmRi",
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const articleIsFavorite = useCallback(
    (article) => {
      return favArticles.some((favArticle) => favArticle.slug === article.slug);
    },
    [favArticles]
  );

  const addFave = async(article) => {
    if (!data) return;
    await addFavArticle(article);
  };

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

  const observer = useRef(null);
  const lastArticleRef = useCallback(
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
    <>
      <Box
        sx={{
          textAlign: "center",
          mb: 1,
        }}
      >
        <Typography variant="h2">Latest Articles</Typography>
      </Box>
      <Container
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Masonry
          columns={{
            xs: 1,
            sm: 2,
            md: 3,
          }}
          spacing={3}
          sx={{
            border: {
              xs: "none",
              lg: "1px dotted  #000",
            },
          }}
        >
          {data.allContent.Content.map((article, i) => {
            if (data.allContent.Content.length == i + 1) {
              return (
                <Box ref={lastArticleRef} key={article.url}>
                  <ArticleCard
                    article={article}
                    isFave={articleIsFavorite(article)}
                    onFave={() => addFave(article)}
                  />
                </Box>
              );
            } else {
              return (
                <Box key={article.url}>
                  <ArticleCard
                    article={article}
                    isFave={articleIsFavorite(article)}
                    onFave={() => addFave(article)}
                  />
                </Box>
              );
            }
          })}
        </Masonry>
      </Container>
    </>
  );
};

export default LatestArticles;
{
  /* <>
<Grid container spacing={3}>
  {data.allContent.Content.map((article, i) => {
    if (data.allContent.Content.length == i + 1) {
      return (
        <Grid
          item
          xs={12}
          sm={6}
          key={article.url}
          ref={lastArticleRef}
        ></Grid>
      );
    } else {
      return (
        <Grid item md={4} key={article.url}>
          <Box sx={{ textAlign: "center" }}>
            <Image src={article.photosTout.url} alt={"img"} />

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="body2" color="text.primary">
                {article.channel.name.toUpperCase()} /&nbsp;
              </Typography>
              <Typography variant="body2" color="text.secondary">
                pub
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: "bold", fontSize: "large" }}>
              asd
            </Typography>
          </Box>
        </Grid>
      );
    }
  })}
</Grid>
</> */
}
