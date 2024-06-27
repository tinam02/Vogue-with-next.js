import { useQuery } from '@apollo/client';
import { Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useRef } from 'react';

import ShowCard from '../../components/UI/ShowCard';
import { GET_SEASON_SHOWS } from '../../queries';

const SeasonPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { loading, error, data, fetchMore } = useQuery(GET_SEASON_SHOWS, {
    variables: { after: '', filter: { season: { slug: slug } } },
    notifyOnNetworkStatusChange: true,
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

  const observer = useRef(null);
  const lastShowRef = useCallback(
    node => {
      if (loading) return;
      if (!data) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
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
  return (
    <>
      <Head>
        <title>{data.allContent.Content[0]?.season.name || 'Season'}</title>
      </Head>
      <Container maxWidth='lg'>
        <Typography
          sx={{
            textAlign: 'center',
            fontFamily: 'BB',
          }}
        >
          &#65103;{slug}&#65103;
        </Typography>
        <Grid container spacing={2} sx={{ my: 0 }}>
          {data.allContent.Content?.map((show, i) => {
            if (data.allContent.Content.length == i + 1) {
              return (
                <Link
                  key={show.id}
                  href={{
                    pathname: '/collection/[slug]',
                    query: {
                      slug: show.slug,
                    },
                  }}
                >
                  <Grid item xs={12} sm={6} md={4} lg={3} ref={lastShowRef}>
                    <ShowCard
                      resizedUrl={show.photosTout?.resizedUrl}
                      altText={show.photosTout?.altText}
                      title={show.brand?.name}
                      channel={show.channels[0]?.name}
                      season={show.season?.name}
                      brand={show.brand?.name}
                    />
                  </Grid>
                </Link>
              );
            } else {
              return (
                <Link
                  key={show.id}
                  href={{
                    pathname: '/collection/[slug]',
                    query: {
                      slug: show.slug,
                    },
                  }}
                  passHref
                >
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    component='a'
                    sx={{
                      textDecoration: 'none',
                    }}
                  >
                    <ShowCard
                      resizedUrl={show.photosTout?.resizedUrl}
                      altText={show.photosTout?.altText}
                      title={show.brand?.name}
                      channel={show.channels[0]?.name}
                      season={show.season?.name}
                      brand={show.brand?.name}
                    />
                  </Grid>
                </Link>
              );
            }
          })}
        </Grid>
      </Container>
    </>
  );
};

export default SeasonPage;
