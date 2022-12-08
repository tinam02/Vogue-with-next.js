import Masonry from '@mui/lab/Masonry';
import { Box, Container } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import ProfileNav from '../../components/UI/ProfileNav';
import ShowCard from '../../components/UI/ShowCard';
import { FBContext } from '../../context/FBContext';

export default function SavedShows() {
  const { favShows, currentUser, loading } = useContext(FBContext);
  const router = useRouter();

  useEffect(() => {
    if (!(currentUser || loading)) router.push("/");
  }, [currentUser, router, loading]);

  return (
    <>
      <Head>
        <title>Saved Shows</title>
      </Head>

      <main>
        <ProfileNav />
        {favShows?.length === 0 && <p>You have no saved shows.</p>}
        {favShows?.length > 0 && (
          <Container
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Masonry
              columns={{
                xs: 1,
                sm: 2,
                md: 3,
              }}
              spacing={3}
              sx={{
                border: {
                  xs: "none",
                  lg: "1px dotted  #000",
                },
              }}
            >
              {favShows?.map((show, i) => {
                return (
                  <Link
                    key={show.slug}
                    href={{
                      pathname: "/collection/[slug]",
                      query: {
                        slug: show.slug,
                      },
                    }}
                  >
                    <Box>
                      <ShowCard
                        resizedUrl={show.photosTout?.url}
                        altText={show.photosTout?.altText || "show"}
                        title={show.brand?.name}
                        season={show.season?.name}
                        brand={show.brand?.name}
                      />
                    </Box>
                  </Link>
                );
              })}
            </Masonry>
          </Container>
        )}
      </main>
    </>
  );
}
