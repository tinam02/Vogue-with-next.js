import { useQuery } from '@apollo/client';
import { useCallback, useContext } from 'react';

import { FBContext } from '../../../context/FBContext';
import { SEARCH_ARTICLES } from '../../../queries';
import Spinner from '../../UI/Spinner';
import LatestArticles from '../Article/LatestArticles';

const SearchArticles = ({ searchTerm }) => {
  const { favArticles, addFavArticle } = useContext(FBContext);
  const { error, data, refetch, networkStatus } = useQuery(SEARCH_ARTICLES, {
    skip: searchTerm.length <= 3,
    variables: { searchTerm, after: "" },
    notifyOnNetworkStatusChange: true, //ovo vraca loading state (ili network status 3) da se key ne bi ponavljao!! bez ovoga je loading uvek false
  });
  const articleIsFavorite = useCallback(
    (article) => {
      return favArticles.some((favArticle) => favArticle.slug === article.slug);
    },
    [favArticles]
  );
  const addFave = async (article) => {
    if (!data) return;
    await addFavArticle(article);
  };

  if (networkStatus === 1) return <Spinner />;
  if (error) return <p>Error</p>;
  if (!data) return null;
  return (
    <div>
      {networkStatus === 2 && <Spinner />}
      <LatestArticles searchTerm={searchTerm} />
    
    </div>
  );
};

export default SearchArticles;
