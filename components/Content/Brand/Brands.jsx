import { useQuery } from '@apollo/client';

import { GET_BRANDS } from '../../../queries';

 
const Brands = () => {
  const { loading, error, data } = useQuery(GET_BRANDS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      <h2>Brands</h2>
      <ul>
        {data.allBrands.Brand.map((brand) => (
          <li key={brand.id}>{brand.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Brands;
