import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BRANDS } from "../../../queries";
import Link from "next/link";
import {
  Box,
  Divider,
  Link as MuiLink,
  SvgIcon,
  Typography,
} from "@mui/material";
import Spinner from "../../UI/Spinner";

const SearchBrands = ({ searchTerm }) => {
  const { error, data, networkStatus } = useQuery(GET_BRANDS, {
    skip: searchTerm.length <= 3,
    variables: { searchTerm },
    notifyOnNetworkStatusChange: true,
  });

  if (networkStatus === 1) return <Spinner />;
  if (error) return <p>Error</p>;
  if (!data) return null;
  if (searchTerm.length >= 3 && data && data.allBrands.Brand.length == 0)
    return <Typography>No brands found</Typography>;
  return (
    <div>
      {networkStatus === 2 && <Spinner />}
      <Divider
        sx={{
          display: {
            xs: "none",
            lg: "block",
          },
        }}
      />
      <Divider
        sx={{
          my: 0.5,
          display: {
            xs: "none",
            lg: "block",
          },
        }}
      />
      {data.allBrands?.Brand?.length > 0 && (
        <>
          <Box
            sx={{
              gap: 1,
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
            }}
          >
            <SvgIcon sx={{ fontSize: 16 }}>
              <path d="M12,17.27L18.18,21L16.54,14.35L22,9.24L15.45,8.73L12,2.28L8.55,8.73L2,9.24L7.45,14.35L5.82,21L12,17.27Z" />
            </SvgIcon>
            <Typography>Found {data.allBrands.Brand.length} brands</Typography>
          </Box>
          {data.allBrands.Brand.map((brand, i) => {
            return (
              <Link
                key={brand.id}
                passHref
                href={{
                  pathname: "/brand/[slug]",
                  query: {
                    slug: brand.slug,
                  },
                }}
              >
                <MuiLink
                  underline="hover"
                  sx={{
                    display: "block",
                  }}
                >
                  {i + 1}. {brand.name}
                </MuiLink>
              </Link>
            );
          })}
        </>
      )}
    </div>
  );
};

export default SearchBrands;
