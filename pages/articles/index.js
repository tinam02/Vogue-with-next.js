import Head from 'next/head';

import LatestArticles from '../../components/Content/Article/LatestArticles';

const Articles = () => {
  return (
    <>
      <Head>
        <title>Articles</title>
      </Head>
      <LatestArticles />
    </>
  );
};

export default Articles;
