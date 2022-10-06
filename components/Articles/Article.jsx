import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_ARTICLE } from "../../queries";
import Image from "next/image";
import { Box, Button } from "@mui/material";
import { FBContext } from "../../context/FBContext";

const Article = ({
  url = "https://www.vogue.com/slideshow/phil-ohs-best-street-style-photos-from-the-paris-spring-2023-shows",
}) => {
  const {addFavArticle} = useContext(FBContext)
  const { loading, error, data } = useQuery(GET_ARTICLE, {
    variables: { url: url },
  });

  const addFave = () => {
    if(!data) return;
    console.log(data);
    addFavArticle(data.articleCopilot)
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  if (!data) return null;
  return (
    <Box sx={{ backgroundColor: "skyblue" ,m:0}}>
      {data.articleCopilot.title}
      <Image
        height={200}
        width={300}
        objectFit="cover"
        alt={data.articleCopilot.photosTout.altText}
        src={data.articleCopilot.photosTout.resizedUrl}
      />
      <Button onClick={addFave}>&lt;3</Button>
    </Box>
  );
};

export default Article;
