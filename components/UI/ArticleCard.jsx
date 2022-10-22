import React from "react";
import { Box, ButtonBase,  Typography } from "@mui/material";
import Image from "mui-image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import convertDate from "../../services/convertDate";
import { BookmarkBlank, BookmarkFilled } from "./Icons/Bookmark";

const ArticleCard = ({ article, isFave = false, onFave }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "justify",
        alignItems: "center",
      }}
    >
      <Image src={article.photosTout.resizedUrl} alt={"img"} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography variant="body2" color="text.primary">
              {article.channel?.name?.toUpperCase() || "ARTICLE"} /&nbsp;
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {convertDate(article.GMTPubDate)}
            </Typography>
          </Box>
          <ButtonBase onClick={onFave} sx={{ p: 0, m: 0 }} disableRipple>
            {isFave ? <BookmarkFilled /> : <BookmarkBlank />}
          </ButtonBase>
        </Box>
        <Link
          passHref
          href={{
            pathname: "/articles/[slug]",
            query: {
              slug: article.slug,
            },
          }}
        >
          <Box>
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => (
                  <Typography
                    {...props}
                    sx={{
                      fontSize: "large",
                      "&:hover": {
                        cursor: "pointer",
                        textDecoration: "underline",
                      },
                    }}
                  />
                ),
              }}
            >
              {article.title}
            </ReactMarkdown>
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default ArticleCard;
