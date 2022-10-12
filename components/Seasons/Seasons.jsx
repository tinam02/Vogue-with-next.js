import React from "react";
import { useQuery } from "@apollo/client";
import { GET_SEASONS, GET_BRAND } from "../../queries";

const SeasonRes = ({ searchTerm = null }) => {
  const { loading, error, data } = useQuery(GET_BRAND);
  console.log(data);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  return <div>Seasons</div>;
};

export default SeasonRes;
