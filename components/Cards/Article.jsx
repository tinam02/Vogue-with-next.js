import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_ARTICLE } from "../../queries";
import Image from "next/image";
import { Box, Button } from "@mui/material";
import { FBContext } from "../../context/FBContext";

const Article = ({
  url = "https://www.vogue.com/slideshow/phil-ohs-best-street-style-photos-from-the-paris-spring-2023-shows",
  isFavorite = false,
}) => {
  const { addFavArticle } = useContext(FBContext);
  const { loading, error, data } = useQuery(GET_ARTICLE, {
    variables: { url: url },
  });

  const addFave = () => {
    if (!data) return;
    addFavArticle(data.articleCopilot);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data) return null;
  return (
    <Box sx={{ backgroundColor: "skyblue", m: 0 }}>
      {data.articleCopilot.title}
      <Image
        height={200}
        width={300}
        objectFit="cover"
        alt={data.articleCopilot.photosTout.altText}
        src={data.articleCopilot.photosTout.resizedUrl}
      />
      <Button onClick={addFave} sx={{ p: 0, m: 0 }}>
        {isFavorite ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 3H5V21L12 18L19 21V3Z"
              fill="black"
              fillOpacity="0.9"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 3H19V21L12 18L5 21V3ZM12 15.82L17 18V5H7V18L12 15.82Z"
              fill="black"
              fillOpacity="0.9"
            />
          </svg>
        )}
      </Button>
    </Box>
  );
};

export default Article;
