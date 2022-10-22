import { useCallback, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GET_ARTICLE } from "../../queries";
import {
  Box,
  Button,
  ButtonBase,
  CardContent,
  Collapse,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import removeBrackets from "../../services/removeBrackets";
import Image from "mui-image";
import { FBContext } from "../../context/FBContext";
import convertDate from "../../services/convertDate";
import Spinner from "../../components/UI/Spinner";
import {
  BookmarkBlank,
  BookmarkFilled,
} from "../../components/UI/Icons/Bookmark";

const ArticlePage = () => {
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

  if (loading) return <Spinner />;
  if (!data) return null;
  console.log(data.articleCopilot);
  return (
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
          alignItems: "center",
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Typography
          sx={{
            textTransform: "uppercase",
            textAlign: "center",
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
          sx={{ p: 0, m: 0 }}
          disableRipple
        >
          {articleIsFavorite(data.articleCopilot) ? (
            <BookmarkFilled fontSize={34} />
          ) : (
            <BookmarkBlank fontSize={34} />
          )}
        </ButtonBase>
      </Box>
    </Container>
  );
};

export default ArticlePage;
