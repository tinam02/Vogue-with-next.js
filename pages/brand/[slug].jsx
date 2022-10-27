import { useQuery } from "@apollo/client";
import {
  Box,
  ButtonBase,
  Collapse,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import ShowCard from "../../components/UI/ShowCard";
import { GET_BRAND_SHOWS } from "../../queries";
import removeBrackets from "../../services/removeBrackets";

const SeasonPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { loading, error, data, fetchMore } = useQuery(GET_BRAND_SHOWS, {
    variables: { after: "", filter: { brand: { slug: slug } } },
    notifyOnNetworkStatusChange: true,
  });

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
  return (
    <>
      <Head>
        <title>{data.allContent.Content[0].brand.name}</title>
      </Head>
      <Container
        maxWidth="lg"
        sx={{
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              md: "center",
            },
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
        >
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: {
                xs: "34px",
                md: "44px",
              },
            }}
          >
            &#65103;{slug}&#65103;
          </Typography>
          {/* designers */}
          {data.allContent.Content[0]?.brand.designers.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: {
                  lg: 2,
                },
                flexDirection: {
                  xs: "column",
                  lg: "row",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", pt: "2px" }}
                >
                  DESIGNERS:&nbsp;
                </Typography>
                {data.allContent.Content[0].brand.designers.map((designer) => (
                  <Box
                    key={designer.name}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography>{designer.name}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {designer.startYear && (
                        <Typography
                          variant="body2"
                          sx={{ opacity: "0.4", fontSize: "12px" }}
                        >
                          {designer.startYear} -&nbsp;
                        </Typography>
                      )}
                      {designer.endYear && (
                        <Typography
                          variant="body2"
                          sx={{ opacity: "0.4", fontSize: "12px" }}
                        >
                          {designer.endYear}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
              {data.allContent.Content[0].brand.previousDesigners && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    transform: "rotate(10deg)",
                  }}
                />
              )}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", pt: "2px" }}
                >
                  PREVIOUS DESIGNERS:&nbsp;
                </Typography>
                <Box>
                  {data.allContent.Content[0].brand.previousDesigners.map(
                    (designer) => (
                      <Box
                        key={designer.name}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography>{designer.name}</Typography>
                        <Box
                          sx={{
                            display: {
                              xs: "none",
                              lg: "flex",
                            },
                            alignItems: "center",
                          }}
                        >
                          {designer.startYear && (
                            <Typography
                              variant="body2"
                              sx={{ opacity: "0.4", fontSize: 11 }}
                            >
                              {designer.startYear} -&nbsp;
                            </Typography>
                          )}
                          {designer.endYear && (
                            <Typography
                              variant="body2"
                              sx={{ opacity: "0.4", fontSize: 11 }}
                            >
                              {designer.endYear}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    )
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        <Box>
          {/* description */}
          {!expanded && (
            <Box sx={{ position: "relative" }}>
              <Typography
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.4,
                  pointerEvents: "none",
                  background: (theme) => theme.palette.primary.mainGradient,
                }}
              />
              <ReactMarkdown>
                {data.allContent.Content[0]?.brand?.description &&
                  removeBrackets(
                    data.allContent.Content[0].brand.description
                  ).slice(0, 600) + "..."}
              </ReactMarkdown>
            </Box>
          )}
          <Collapse in={expanded} unmountOnExit>
            <ReactMarkdown>
              {data.allContent.Content[0]?.brand?.description &&
                removeBrackets(data.allContent.Content[0].brand.description)}
            </ReactMarkdown>
          </Collapse>
          {data.allContent.Content[0]?.brand?.description && (
            <ButtonBase
              disableRipple
              onClick={handleExpandClick}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Box
                sx={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.5s",
                }}
              >
                &#x25BC;
              </Box>
              Show {expanded ? "less" : "more"}
            </ButtonBase>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />
        {/* shows */}
        <Typography variant="body2">SHOWS</Typography>
        <Grid container spacing={2}>
          {data.allContent.Content.map((show, i) => {
            if (data.allContent.Content.length == i + 1) {
              return (
                <Link
                  key={show.id}
                  href={{
                    pathname: "/collection/[slug]",
                    query: {
                      slug: show.slug,
                    },
                  }}
                >
                  <Grid item xs={12} sm={6} md={4} lg={3} ref={lastShowRef}>
                    <ShowCard
                      resizedUrl={show.photosTout.resizedUrl}
                      altText={show.photosTout.altText}
                      title={show.title}
                      channel={show.channels[0]?.name}
                      season={show.season.name}
                    />
                  </Grid>
                </Link>
              );
            } else {
              return (
                <Link
                  key={show.id}
                  href={{
                    pathname: "/collection/[slug]",
                    query: {
                      slug: show.slug,
                    },
                  }}
                >
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <ShowCard
                      resizedUrl={show.photosTout.resizedUrl}
                      altText={show.photosTout.altText}
                      title={show.title}
                      channel={show.channels[0]?.name}
                      season={show.season.name}
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
