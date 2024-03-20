import { useQuery } from '@apollo/client';
import Profile from '../components/Profile';
import { QUERY_PROFILES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            profiles.map(profile => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
