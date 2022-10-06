import Head from "next/head";
import { useContext } from "react";
import { FBContext } from "../context/FBContext";
import Article from "../components/Articles/Article";
import { Button, Grid } from "@mui/material";

export default function Favorites() {
  const { favArticles } = useContext(FBContext);

  return (
    <div>
      <Head>
        <title>Favorite Articles</title>
      </Head>

      <main>
        <Grid container spacing={3}>
          {favArticles.map((article, i) => {
            return (
              <Grid item key={article.url} xs={12} md={6} xl={3}>
                <Article url={article.url} />
              </Grid>
            );
          })}
        </Grid>
      </main>
    </div>
  );
}
