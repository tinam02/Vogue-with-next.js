import Head from "next/head";
import { useContext, useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { FBContext } from "../../context/FBContext";
import Link from "next/link";
import ProfileNav from "../../components/UI/ProfileNav";

const Account = () => {
  const router = useRouter();
  const { pathname } = router;
  console.log(pathname);
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
