import Head from "next/head";
import { useContext, useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { FBContext } from "../../context/FBContext";
import ProfileNav from "../../components/UI/ProfileNav";

const Account = () => {
  const { currentUser, loading } = useContext(FBContext);
  const router = useRouter();
  const { push } = router;

  useEffect(() => {
    if (!currentUser && !loading) {
      push("/");
    }
  }, [currentUser, loading, push]);

  return (
    <>
      <Head>
        <title>My Account - Saved Articles</title>
      </Head>

      <main>
        <ProfileNav />
      </main>
    </>
  );
};

export default Account;
