import Masonry from '@mui/lab/Masonry';
import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import ArticleCard from '../../components/UI/ArticleCard';
import ProfileNav from '../../components/UI/ProfileNav';
import { FBContext } from '../../context/FBContext';

export default function FavoriteArticles() {
  const { favArticles, currentUser, loading, addFavArticle } =
    useContext(FBContext);
  const router = useRouter();

  useEffect(() => {
    if (!(currentUser || loading)) router.push("/");
  }, [currentUser, router, loading]);

  const addFave = async (article) => {
    if (!article) return;
    await addFavArticle(article);
  };

  return (
    <div>
      <Head>
        <title>Favorite Articles</title>
      </Head>

      <main>
        <ProfileNav />
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
            {favArticles.map((article, i) => {
              return (
                <Box key={article.slug}>
                  <ArticleCard
                    article={article}
                    isFave={true}
                    onFave={() => addFave(article)}
                  />
                </Box>
              );
            })}
          </Masonry>
        </Container>
      </main>
    </div>
  );
}
