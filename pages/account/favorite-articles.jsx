import Head from "next/head";
import { useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { FBContext } from "../../context/FBContext";
import ProfileNav from "../../components/UI/ProfileNav";
import ArticleCard from "../../components/UI/ArticleCard";

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
        <Grid container spacing={3}>
          {favArticles.map((article, i) => {
            return (
              <Grid item key={article.slug} sm={12} md={6} xl={3}>
                <ArticleCard
                  article={article}
                  isFave={true}
                  onFave={() => addFave(article)}
                />
              </Grid>
            );
          })}
        </Grid>
      </main>
    </div>
  );
}
