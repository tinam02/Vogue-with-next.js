import { useQuery } from '@apollo/client';
import Masonry from '@mui/lab/Masonry';
import { Box, Container, Typography } from '@mui/material';
import { useCallback, useContext, useRef } from 'react';

import { FBContext } from '../../../context/FBContext';
import { GET_ARTICLES } from '../../../queries';
import ArticleCard from '../../UI/ArticleCard';
import Spinner from '../../UI/Spinner';

const LatestArticles = () => {
  const { favArticles, addFavArticle } = useContext(FBContext);
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_ARTICLES,
    {
      variables: {
        after: "",
      },
      notifyOnNetworkStatusChange: true,
    }
  );
  console.log(networkStatus);
  const articleIsFavorite = useCallback(
    (article) => {
      return favArticles.some((favArticle) => favArticle.slug === article.slug);
    },
    [favArticles]
  );

  const addFave = async (article) => {
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

  if (networkStatus === 1) return <Spinner />;
  if (error) return <p>Error...</p>;
  if (!data) return null;
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
          alignItems: "center",
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
                <Box key={article.url} ref={lastArticleRef}>
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

      {networkStatus === 3 && (
        <Box
          sx={{
            pt: 3,
            mb: {
              xs: 6,
              sm: 2,
            },
          }}
        >
          <Spinner />
        </Box>
      )}
    </>
  );
};

export default LatestArticles;
