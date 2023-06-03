import Main from "./Main";
import SellingSection from "./SellingSection";
import TrendingSection from "./TrendingSection";
import HostPromoteSection from "./HostPromoteSection";
import getHomeInfoApi from "../../api/getHomeInfoApi";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHomeInfoApi();
      setHomeData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Main />
      <SellingSection
        data={homeData?.affordableVenues}
        key={1}
        title="Affordable Escapes"
      />
      <SellingSection
        data={homeData?.trendingCountries}
        key={2}
        title="Popular Destinations"
      />
      <TrendingSection data={homeData?.trendingVenues} />
      <HostPromoteSection />
    </>
  );
};

export default HomePage;
