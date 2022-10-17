import Head from "next/head";
import { useContext, useEffect } from "react";

import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Article from "../../components/Cards/Article";
import { FBContext } from "../../context/FBContext";
import ProfileNav from "../../components/UI/ProfileNav";

export default function FavoriteArticles() {
  const { favArticles, currentUser, loading } = useContext(FBContext);
  const router = useRouter();

  useEffect(() => {
    if (!(currentUser || loading)) router.push("/");
  }, [currentUser, router, loading]);

  return (
    <div>
      <Head>
        <title>Favorite Articles</title>
      </Head>

      <main>
        <ProfileNav  />
        <Grid container spacing={3}>
          {favArticles.map((article, i) => {
            return (
              <Grid item key={article.url} xs={12} md={6} xl={3}>
                <Article url={article.url} isFavorite={true} />
              </Grid>
            );
          })}
        </Grid>
      </main>
    </div>
  );
}
