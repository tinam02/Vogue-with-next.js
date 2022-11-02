import { useQuery } from '@apollo/client';
import { Box, ButtonBase, Container, Divider, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useContext, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import AuthorCard from '../../components/UI/AuthorCard';
import { BookmarkBlank, BookmarkFilled } from '../../components/UI/Icons/Bookmark';
import { ShowFourImages, ShowSingleImage } from '../../components/UI/Icons/ImageAmount';
import ProductCard from '../../components/UI/ProductCard';
import Spinner from '../../components/UI/Spinner';
import { FBContext } from '../../context/FBContext';
import { GET_ARTICLE } from '../../queries';
import formatBody from '../../services/bodyRegex';
import convertDate from '../../services/convertDate';

const ArticlePage = () => {
  const [imagesToShow, setImagesToShow] = useState(12);
  const router = useRouter();
  const { slug } = router.query;
  const { loading, data } = useQuery(GET_ARTICLE, {
    variables: { slug },
  });
  const { favArticles, addFavArticle } = useContext(FBContext);

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

  const embedImages = useMemo(() => {
    if (!data) return false;
    const images = data.articleCopilot?.bodyEmbeds.filter(
      (embed) => embed.__typename === "Image"
    );
    return images;
  }, [data]);

  const embedProducts = useMemo(() => {
    if (!data) return false;
    const products = data.articleCopilot?.bodyEmbeds.filter(
      (embed) => embed.__typename === "Product"
    );
    return products;
  }, [data]);

  if (loading) return <Spinner />;
  if (!data) return <>no data</>;
  return (
    <>
      <Head>
        <title>{data.articleCopilot.title || "Article"}</title>
      </Head>
      <Container
        sx={{
          textAlign: "justify",
          whiteSpace: "pre-wrap",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: {
              xs: "center",
              md: "flex-start",
            },

            gap: 4,
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {convertDate(data.articleCopilot.GMTPubDate)}
          </Typography>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              gap: 0.5,
            }}
          >
            {data.articleCopilot.channels?.map((channel, i) => (
              <Typography
                key={channel.id}
                variant="body2"
                sx={{ fontFamily: "BB", color: "text.secondary" }}
              >
                {channel.name}{" "}
                {i < data.articleCopilot.channels.length - 1 ? "/" : ""}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: {
              xs: "center",
              md: "flex-start",
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
              textAlign: {
                xs: "center",
                md: "left",
              },
              fontSize: {
                xs: "22px",
                md: "28px",
              },
            }}
          >
            {data.articleCopilot.title}
          </Typography>
          <ButtonBase
            onClick={() => addFave(data.articleCopilot)}
            disableRipple
            sx={{
              my: 1,
            }}
          >
            {articleIsFavorite(data.articleCopilot) ? (
              <BookmarkFilled fontSize={34} />
            ) : (
              <BookmarkBlank fontSize={34} />
            )}
          </ButtonBase>
        </Box>

        {/* Body */}
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => (
              <Typography
                {...props}
                sx={{
                  whiteSpace: "pre-line",
                  fontFamily: "BB",
                }}
              />
            ),
          }}
        >
          {formatBody(data.articleCopilot.body)}
        </ReactMarkdown>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            mt: 2,
          }}
        >
          <AuthorCard
            name={data.articleCopilot?.contributor?.author[0]?.name}
            avatar={
              data.articleCopilot?.contributor?.author[0]?.photosTout?.url
            }
          />
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* Embeds */}
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            justifyContent: "flex-end",
          }}
        >
          <ButtonBase
            disableRipple
            sx={{
              opacity: imagesToShow === 12 ? 1 : 0.5,
              "&:hover": {
                opacity: 0.8,
                transition: "opacity 0.25s ease-in-out",
              },
            }}
            onClick={() => setImagesToShow(12)}
          >
            <ShowSingleImage />
          </ButtonBase>
          <Divider variant="middle" orientation="vertical" flexItem />
          <ButtonBase
            disableRipple
            sx={{
              opacity: imagesToShow === 4 ? 1 : 0.5,
              "&:hover": {
                opacity: 0.8,
                transition: "opacity 0.25s ease-in-out",
              },
            }}
            onClick={() => setImagesToShow(4)}
          >
            <ShowFourImages />
          </ButtonBase>
        </Box>
        {embedImages.length > 0 && (
          <Grid container spacing={2}>
            {embedImages.map((embed) => (
              <Grid item xs={12} md={6} lg={imagesToShow} key={embed.id}>
                <Image
                  src={imagesToShow === 4 ? embed.resizedUrl : embed.url}
                  alt="Embed image"
                />
              </Grid>
            ))}
          </Grid>
        )}
        {embedProducts.length > 0 && (
          <>
            <Divider sx={{ mt: 2 }} />
            <Typography
              sx={{
                fontSize: {
                  xs: 30,
                  sm: 50,
                },
              }}
            >
              *PRODUCTS you might like
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid
              container
              spacing={{
                xs: 2,
                lg: 3,
              }}
            >
              {embedProducts.map((embed) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={embed.id}>
                  <ProductCard
                    seller={embed.offers[0]?.sellerName}
                    name={embed.name}
                    price={embed.offers[0]?.price}
                    image={embed.photosTout?.resizedUrl}
                    uri={embed.offers[0]?.purchaseUri}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </>
  );
};

export default ArticlePage;
