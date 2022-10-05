import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ARTICLE } from "../../queries";
import Image from "next/image";

const Article = () => {
  const { loading, error, data } = useQuery(GET_ARTICLE);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  if (!data) return null;
  return (
    <div>
      {data.articleCopilot.title}
      <Image
       layout='fill'
       objectFit='contain'
        alt={data.articleCopilot.photosTout.altText}
        src={data.articleCopilot.photosTout.resizedUrl}
      />
    </div>
  );
};

export default Article;
