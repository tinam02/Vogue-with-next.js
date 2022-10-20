import React from "react";
import { Box, ButtonBase, Container, Grid, Typography } from "@mui/material";
import Image from "mui-image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const ArticleCard = ({ article, isFave = false, onFave }) => {
  const pubDate = new Date(article.GMTPubDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
              {pubDate}
            </Typography>
          </Box>
          <ButtonBase onClick={onFave} sx={{ p: 0, m: 0 }} disableRipple>
            {isFave ? (
              <Image
                src="/bookmarkFilled.svg"
                alt="bookmark-filled"
                width={24}
              />
            ) : (
              <Image src="/bookmarkBlank.svg" alt="bookmark-blank" width={24} />
            )}
          </ButtonBase>
        </Box>
        <Link passHref href="/">
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
            </ReactMarkdown>{" "}
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default ArticleCard;
