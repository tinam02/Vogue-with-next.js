import { TextField, Container } from "@mui/material";
import { useState } from "react";

import SearchArticles from "../../components/Content/Search/SearchArticles";
import SearchBrands from "../../components/Content/Search/SearchBrands";
import SearchNav from "../../components/Content/Search/SearchNav";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState("brands");

  const fetchResult = (term) => {
    if (term.length > 3) setSearchTerm(term);
  };

  return (
    <Container>
      <TextField
        InputLabelProps={{
          style: { fontFamily: "BB" },
        }}
        label="Enter search term..."
        variant="standard"
        fullWidth
        onKeyDown={(e) => {
          if (e.key === "Enter") fetchResult(e.target.value);
        }}
      />

      <SearchNav {...{ selected, setSelected }} />

      {selected === "brands" && <SearchBrands searchTerm={searchTerm} />}
      {selected === "articles" && <SearchArticles searchTerm={searchTerm} />}
    </Container>
  );
};

export default SearchPage;
