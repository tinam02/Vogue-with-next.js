import { Container, TextField } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';

import SearchArticles from '../../components/Content/Search/SearchArticles';
import SearchBrands from '../../components/Content/Search/SearchBrands';
import SearchNav from '../../components/Content/Search/SearchNav';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState("brands");

  const fetchResult = (term) => {
    if (term.length > 3) setSearchTerm(term);
  };

  return (
    <>
      <Head>
        <title>
          {selected === "brands" ? "Search | Brands" : "Search | Articles"}
        </title>
      </Head>
      <Container>
        <TextField
          fullWidth
          variant="standard"
          label="Enter search term..."
          InputLabelProps={{ style: { fontFamily: "BB" } }}
          onKeyDown={(e) => {if (e.key === "Enter") fetchResult(e.target.value)}}
        />

        <SearchNav {...{ selected, setSelected }} />

        {selected === "brands" && <SearchBrands searchTerm={searchTerm} />}
        {selected === "articles" && <SearchArticles searchTerm={searchTerm} />}
      </Container>
    </>
  );
};

export default SearchPage;
