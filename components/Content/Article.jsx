import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_ARTICLE } from "../../queries";
import { Box, Button } from "@mui/material";
import { FBContext } from "../../context/FBContext";
import Image from "mui-image";

const Article = ({
  slug = "https://www.vogue.com/slideshow/phil-ohs-best-street-style-photos-from-the-paris-spring-2023-shows",
  isFavorite = false,
}) => {
  const { addFavArticle } = useContext(FBContext);
  const { loading, error, data } = useQuery(GET_ARTICLE, {
    variables: { slug: slug },
  });

  const addFave = () => {
    if (!data) return;
    addFavArticle(data.articleCopilot);
  };
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data) return null;
  return (
    <Box sx={{ backgroundColor: "skyblue", m: 0 }}>
      {data.articleCopilot.title}
      <Image
        height={200}
        width={300}
        alt={data.articleCopilot.photosTout.altText}
        src={data.articleCopilot.photosTout.resizedUrl}
      />
      <Button onClick={addFave} sx={{ p: 0, m: 0 }}>
        {isFavorite ? (
          <Image src="/bookmarkFilled.svg" alt="bookmark-filled" width={29} />
        ) : (
          <Image src="/bookmarkBlank.svg" alt="bookmark-blank" width={29} />
        )}
      </Button>
    </Box>
  );
};

export default Article;
