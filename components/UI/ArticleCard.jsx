import { Box, ButtonBase, Link as MuiLink, Typography } from '@mui/material';
import Image from 'mui-image';
import Link from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import convertDate from '../../services/convertDate';
import { BookmarkBlank, BookmarkFilled } from './Icons/Bookmark';

const ArticleCard = ({ article, isFave = false, onFave }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "justify",
    }}
  >
    <Box
      sx={{
        overflow: "hidden",
        "> div": {
          transition: "transform 0.3s ease-in-out",
        },
        "> div:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Image src={article.photosTout.resizedUrl} alt={"img"} />
    </Box>

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
        <MuiLink underline="hover">
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => (
                <Typography
                  {...props}
                  sx={{
                    fontSize: "large",
                  }}
                />
              ),
            }}
          >
            {article.title}
          </ReactMarkdown>
        </MuiLink>
      </Link>
    </Box>
  </Box>
);

export default ArticleCard;
