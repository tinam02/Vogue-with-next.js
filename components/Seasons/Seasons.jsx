import React from "react";
import { useQuery } from "@apollo/client";
import { GET_SEASONS } from "../../queries";

const SeasonRes = ({ searchTerm = "2023" }) => {
  const { loading, error, data } = useQuery(GET_SEASONS, {
    variables: { searchTerm: searchTerm },
  });
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  return <div>Seasons</div>;
};

export default SeasonRes;
