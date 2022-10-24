import { useQuery } from '@apollo/client';
import { TextField } from '@mui/material';
import { useState } from 'react';

import SearchNav from '../../components/Content/Search/SearchNav';
import { GET_BRANDS } from '../../queries';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState("");
  const { error, data, refetch, networkStatus } = useQuery(GET_BRANDS, {
    skip: searchTerm.length <= 3,
    variables: { searchTerm },
    notifyOnNetworkStatusChange: true, //ovo vraca loading state (ili network status 3) da se key ne bi ponavljao!! bez ovoga je loading uvek false
  });

  const fetchResult = (term) => {
    if (term.length > 3) setSearchTerm(term);
  };

  if (networkStatus === 1) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(selected);
  return (
    <>
      {networkStatus === 2 && <p>Loading...</p>}
      <TextField
        InputLabelProps={{
          style: { fontFamily: "BB" },
        }}
        label="Enter search term"
        variant="standard"
        fullWidth
        onKeyDown={(e) => {
          if (e.key === "Enter") fetchResult(e.target.value);
        }}
      />
      <SearchNav selected={selected} setSelected={setSelected} />
    </>
  );
};

export default SearchPage;
